import './Tile.css';
import { DailyVideo } from '@daily-co/daily-react';
import { useRef } from 'react';
import GestureOverlay from '../GestureDetection/GestureOverlay';
import Username from '../Username/Username';

export default function Tile({ id, isLocal }) {
  const videoEl = useRef(null);

  return (
    <div className="tile-video">
      <DailyVideo automirror sessionId={id} ref={videoEl} />
      {isLocal && <GestureOverlay ref={videoEl} />}
      <Username id={id} isLocal={isLocal} />
    </div>
  );
}
