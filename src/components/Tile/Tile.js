import './Tile.css';
import { DailyVideo, useMediaTrack } from '@daily-co/daily-react';
import React, {useRef, Suspense, useState, useEffect} from 'react';
import Username from '../Username/Username';

const ObjectDetection = React.lazy(() => import('../ObjectDetection/ObjectDetection'));
const GestureDetection = React.lazy(() => import('../GestureDetection/GestureDetection'));

export default function Tile({ id, isLocal, model }) {
  const videoEl = useRef(null);
  const videoState = useMediaTrack(id, 'video');
  const [gestureDetectionEnabled, setGestureDetectionEnabled] = useState(false)
  const [objectDetectionEnabled, setObjectDetectionEnabled] = useState(false)

  useEffect(() => {
    if (model === 'gesture-detection') {
      setGestureDetectionEnabled(true)
    }
    if (model === 'object-detection') {
      setObjectDetectionEnabled(true)
    }
  }, [model])

  return (
    <div className="tile-video">
      {!videoState.isOff ? (
        <>
          <DailyVideo automirror sessionId={id} ref={videoEl} />
          <Suspense fallback={<span>Loading...</span>}>
            {isLocal && gestureDetectionEnabled && <GestureDetection ref={videoEl} />}
            {isLocal && objectDetectionEnabled && <ObjectDetection ref={videoEl} />}
          </Suspense>
        </>
      ) : (
        <div className="no-video">No video</div>
      )}
      <Username id={id} isLocal={isLocal} />
    </div>
  );
}
