import './Tile.css';
import { DailyVideo, useLocalSessionId, useMediaTrack } from '@daily-co/daily-react';
import { useRef } from 'react';
import GestureOverlay from '../GestureDetection/GestureOverlay';
import Username from '../Username/Username';

export default function Tile({ id, isLocal }) {
  const videoEl = useRef(null);
  const localSessionId = useLocalSessionId();
  const videoState = useMediaTrack(id, 'video');

  return (
    <div className="tile-video">
      {!videoState.isOff ? (
        <>
          <DailyVideo automirror sessionId={id} ref={videoEl} />
          {isLocal && <GestureOverlay ref={videoEl} />}
        </>
      ) : (
        <div className="no-video">No video</div>
      )}
      {/* <DailyVideo automirror sessionId={id} ref={videoEl} /> */}
      <Username id={id} isLocal={isLocal} />
    </div>
  );
}
