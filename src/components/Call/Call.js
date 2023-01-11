import React, { useState, useCallback } from 'react';
import {
  useAppMessage,
  useLocalParticipant,
  useDailyEvent,
  useParticipantIds,
  DailyAudio,
} from '@daily-co/daily-react';

import './Call.css';
import Tile from '../Tile/Tile';
import UserMediaError from '../UserMediaError/UserMediaError';

export default function Call() {
  /* If a participant runs into a getUserMedia() error, we need to warn them. */
  const [getUserMediaError, setGetUserMediaError] = useState(false);
  const [emojiMessage, setEmojiMessage] = useState('');
  const [messageSender, setMessageSender] = useState('');

  /* We can use the useDailyEvent() hook to listen for daily-js events. Here's a full list
   * of all events: https://docs.daily.co/reference/daily-js/events */
  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  useAppMessage({
    onAppMessage: useCallback((ev) => {
      if (ev?.data?.messageName !== 'emoji-reaction') return;
      setEmojiMessage(ev.data.reaction);
      setMessageSender(ev.data.username);
    }, []),
  });

  /* This is for displaying our self-view. */
  const localParticipant = useLocalParticipant();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });

  const renderCallScreen = () => (
    <div className="call">
      {emojiMessage && (
        <div className="emoji-message">
          {messageSender} says {emojiMessage}!
        </div>
      )}
      {/* Your self view */}
      {localParticipant && <Tile id={localParticipant.session_id} isLocal />}
      {remoteParticipantIds && (
        <div className="remote-participants">
          {remoteParticipantIds.map((id) => (
            <Tile key={id} id={id} />
          ))}
          <DailyAudio />
        </div>
      )}
    </div>
  );

  return getUserMediaError ? <UserMediaError /> : renderCallScreen();
}
