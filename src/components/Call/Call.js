import React, { useState, useCallback } from 'react';
import {

  useLocalParticipant,
  useDailyEvent,
} from '@daily-co/daily-react';

import './Call.css';
import Tile from '../Tile/Tile';
import UserMediaError from '../UserMediaError/UserMediaError';

export default function Call() {
  /* If a participant runs into a getUserMedia() error, we need to warn them. */
  const [getUserMediaError, setGetUserMediaError] = useState(false);

  /* We can use the useDailyEvent() hook to listen for daily-js events. Here's a full list
   * of all events: https://docs.daily.co/reference/daily-js/events */
  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );


  /* This is for displaying our self-view. */
  const localParticipant = useLocalParticipant();


  const renderCallScreen = () => (
    <div className="call">
      {/* Your self view */}
      {localParticipant && <Tile id={localParticipant.session_id} isLocal />}
    </div>
  );

  return getUserMediaError ? <UserMediaError /> : renderCallScreen();
}
