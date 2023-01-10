import './Tile.css';
import { DailyVideo } from '@daily-co/daily-react';
import {useRef} from "react";
import GestureOverlay from "../GestureDetection/GestureOverlay";

export default function Tile({ id }) {
  const videoEl = useRef(null);

  return (
    <div className='tile-video'>
      <DailyVideo automirror sessionId={id} ref={videoEl}/>
      <GestureOverlay ref={videoEl}/>
    </div>
  );
}
