import React, { useCallback } from 'react';
import {
  useDaily,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
} from '@daily-co/daily-react';

import './Tray.css';
import { CameraOn, Leave, CameraOff, MicrophoneOff, MicrophoneOn } from './Icons';

export default function Tray({ leaveCall }) {
  const callObject = useDaily();

  const localParticipant = useLocalParticipant();
  const localVideo = useVideoTrack(localParticipant?.session_id);
  const localAudio = useAudioTrack(localParticipant?.session_id);
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  const toggleVideo = useCallback(() => {
    callObject.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  return (
    <div className="tray">
      <div className="tray-buttons-container">
        <div className="controls">
          <button onClick={toggleVideo} type="button">
            {mutedVideo ? <CameraOff /> : <CameraOn />}
            {mutedVideo ? 'Turn camera on' : 'Turn camera off'}
          </button>
          <button onClick={toggleAudio} type="button">
            {mutedAudio ? <MicrophoneOff /> : <MicrophoneOn />}
            {mutedAudio ? 'Unmute mic' : 'Mute mic'}
          </button>
        </div>
        <div className="leave">
          <button onClick={leaveCall} type="button">
            <Leave /> Leave call
          </button>
        </div>
      </div>
    </div>
  );
}
