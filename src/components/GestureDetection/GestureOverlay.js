import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import './GestureOverlay.css';
import { useAppMessage, useLocalParticipant } from '@daily-co/daily-react';

import * as fp from 'fingerpose';

import hornsGesture from './gestures/Horns';
import heartGesture from './gestures/Heart';
import okGesture from './gestures/OK';
import pointUpGesture from './gestures/PointUp';
import raisedHandGesture from './gestures/RaisedHand';
import thumbsUpGesture from './gestures/ThumbsUp';
import thumbsDownGesture from './gestures/ThumbsDown';
import victoryGesture from './gestures/Victory';
import vulcanGesture from './gestures/Vulcan';

import useModel from './hooks/useModel';
import HandPoseLoader from './models/HandPose';

const landmarkColors = {
  thumb: 'red',
  indexFinger: 'blue',
  middleFinger: 'yellow',
  ringFinger: 'green',
  pinky: 'pink',
  palmBase: 'white',
};

const gestureStrings = {
  thumbs_up: '👍',
  thumbs_down: '👎',
  victory: '✌️',
  raised_hand: '✋',
  ok_hand: '👌',
  vulcan_salute: '🖖',
  pointing_index: '☝️',
  heart_hand: '🫶',
  horns: '🤘',
};

const knownGestures = [
  hornsGesture,
  heartGesture,
  okGesture,
  pointUpGesture,
  raisedHandGesture,
  thumbsUpGesture,
  thumbsDownGesture,
  victoryGesture,
  vulcanGesture,
];

const GestureOverlay = forwardRef((props, ref) => {
  const estimator = new fp.GestureEstimator(knownGestures);
  const { modelLoaded, modelRef } = useModel('webgl', HandPoseLoader);

  const [poseData, setPoseData] = useState(null);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [gesture, setGesture] = useState(null);
  const [handDetected, setHandDetected] = useState(false);

  const canvasRef = useRef(null);
  const internalRef = useRef(null);
  const videoRef = ref || internalRef;

  const handleShowDebugClick = () => {
    setShowDebugInfo(!showDebugInfo);
  };

  /* Initialize canvas that we use to draw the dots on */
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = 1280;
    canvasRef.current.height = 720;
  }, []);

  /* Drawing the hand on the canvas */
  function drawPoint(context, x, y, r, color) {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
  }

  /* Adapted from https://github.com/andypotato/fingerpose/ */
  async function startHandPose() {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext('2d');

    const startEstimatingGesture = async () => {
      // make sure we have everything we need
      if (!canvasContext) return;
      if (!videoRef.current) return;

      // clear canvas overlay
      canvasContext.clearRect(0, 0, canvasRef?.current?.width, canvasRef?.current?.height);

      // Note: Handpose currently only detects one hand at a time
      // Note: setting flipHorizontal to false stops it from rendering the dots for some reason :/
      const predictions = await modelRef?.current?.estimateHands(videoRef?.current, false);

      /* If the predictions array is empty, the model is saying it can't find a hand on screen */
      if (predictions?.length === 0) {
        // no hand detected!
        setHandDetected(false);
        setGesture(null);
      } else {
        setHandDetected(true);
      }

      function findGesture(gesturePredictions) {
        const estimated = estimator.estimate(gesturePredictions.landmarks, 9.0);
        setPoseData(estimated?.poseData);

        if (estimated.gestures.length > 0) {
          // find gesture with the highest match score
          const best = estimated.gestures.reduce((a, b) => (a.score > b.score ? a : b));
          setGesture(gestureStrings[best.name]);
        }
      }

      /* We've detected a hand, so let's start estimating the gesture it's making. */
      predictions?.forEach((prediction) => {
        findGesture(prediction);
      });

      /* We've detected a hand, so let's connect the dots on screen */
      predictions?.forEach((prediction) => {
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const part in prediction.annotations) {
          // eslint-disable-next-line no-restricted-syntax
          for (const point of prediction.annotations[part]) {
            drawPoint(canvasContext, point[0], point[1], 3, landmarkColors[part]);
          }
        }
      });

      setTimeout(() => {
        // make sure the video is actually ready =)
        if (videoRef?.current?.videoHeight !== 0) startEstimatingGesture();
      }, 1000 / 15); // fps
    };

    setTimeout(() => {
      startEstimatingGesture();
    }, 1000);
  }

  const sendMessage = useAppMessage({
    onAppMessage: () => {
      console.log('broadcasting emoji reaction to the rest of the call...');
    },
  });

  const localParticipant = useLocalParticipant();
  const broadcastEmojiGesture = useCallback((reaction) => {
    sendMessage(
      {
        messageName: 'emoji-reaction',
        username: localParticipant?.user_name || localParticipant?.session_id,
        reaction,
      },
      '*', // send emoji to everyone but the local participant
    );
  }, []);

  /* If a gesture is detected, broadcast that gesture to other participants in the call */
  useEffect(() => {
    if (!gesture) return;
    broadcastEmojiGesture(gesture);
  }, [gesture]);

  useEffect(() => {
    videoRef?.current?.addEventListener('loadeddata', () => {
      startHandPose();
    });
  }, [modelLoaded, videoRef]);

  return (
    <>
      <canvas id="pose-canvas" className="layer" ref={canvasRef} />
      <div className="gesture-emoji">{gesture && gesture}</div>
      <div className="hand-status">
        {!handDetected && (
          <>
            <div className="badge">No hand detected</div>
            <button type="button" disabled>
              No info to show you
            </button>
          </>
        )}

        {handDetected && (
          <>
            <div className="badge">Hand detected!</div>
            <button type="button" onClick={handleShowDebugClick}>
              {showDebugInfo ? 'Hide debug info' : 'Show debug info'}
            </button>
          </>
        )}

        {showDebugInfo && (
          <div className="debug">
            {handDetected && (
              <table>
                <thead>
                  <tr>
                    <th>Finger</th>
                    <th style={{ width: 110 }}>Curl</th>
                    <th style={{ width: 150 }}>Direction</th>
                  </tr>
                </thead>
                {poseData &&
                  poseData.map((fingerInfo) => (
                    <tbody key={`body-${fingerInfo}`}>
                      <tr key={`tr-${fingerInfo}`}>
                        <td key={`name-${fingerInfo[0]}`}>{fingerInfo[0]}</td>
                        <td key={`curl-${fingerInfo[1]}`}>{fingerInfo[1]}</td>
                        <td key={`dir-${fingerInfo[2]}`}>{fingerInfo[2]}</td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
});
export default GestureOverlay;
