import './App.css';

import React, { useEffect, useState, useCallback } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { DailyProvider } from '@daily-co/daily-react';
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from './utils';

import HomeScreen from './components/HomeScreen/HomeScreen';
import Call from './components/Call/Call';
import Header from './components/Header/Header';
import Tray from './components/Tray/Tray';

/* We decide what UI to show to users based on the state of the app, which is dependent on the state of the call object: see line 137. */
const STATE_IDLE = 'STATE_IDLE';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';

export default function App() {
  const [appState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);

  /**
   * Show the call UI if we're either joining, already joined, or are showing
   * an error.
   */
  const showCall = [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(appState);

  /**
   * Starts joining an existing call.
   */
  const startJoiningCall = useCallback((url, username) => {
    const newCallObject = DailyIframe.createCallObject();
    newCallObject.setUserName(username)
    newCallObject.join({ url });

    // Set states
    setRoomUrl(url);
    setCallObject(newCallObject);
    setAppState(STATE_JOINING);
    }, []);

  /**
   * Starts leaving the current call.
   */
  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    // If we're in the error state, we've already "left", so just clean up
    if (appState === STATE_ERROR) {
      callObject.destroy().then(() => {
        setRoomUrl(null);
        setCallObject(null);
        setAppState(STATE_IDLE);
      });
    } else {
      /* This will trigger a `left-meeting` event, which in turn will trigger the full clean-up as seen in handleNewMeetingState() below. */
      setAppState(STATE_LEAVING);
      callObject.leave();
    }
  }, [callObject, appState]);

  /**
   * If a room's already specified in the page's URL when the component mounts,
   * join the room.
   */
  useEffect(() => {
    const pageUrl = roomUrlFromPageUrl();
    if (pageUrl) {
      startJoiningCall(pageUrl);
    }
  }, [startJoiningCall]);

  /**
   * Update the page's URL to reflect the active call when roomUrl changes.
   */
  useEffect(() => {
    const pageUrl = pageUrlFromRoomUrl(roomUrl);
    if (pageUrl === window.location.href) return;
    window.history.replaceState(null, null, pageUrl);
  }, [roomUrl]);

  /**
   * Update app state based on reported meeting state changes.
   */
  useEffect(() => {
    if (!callObject) return;

    const events = ['joined-meeting', 'left-meeting', 'error', 'camera-error'];

    function handleNewMeetingState() {
      switch (callObject.meetingState()) {
        case 'joined-meeting':
          setAppState(STATE_JOINED);
          break;
        case 'left-meeting':
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case 'error':
          setAppState(STATE_ERROR);
          break;
        default:
          break;
      }
    }

    // Use initial state
    handleNewMeetingState();

    events.forEach((event) => {
      callObject.on(event, handleNewMeetingState);
    });

    // Stop listening for changes in state
    return function cleanup() {
      events.forEach((event) => {
        callObject.off(event, handleNewMeetingState);
      });
    };
  }, [callObject]);

  return (
    <div className="app">
      <Header />

      {showCall ? (
        <DailyProvider callObject={callObject}>
          <Call />
          <Tray leaveCall={startLeavingCall} />
        </DailyProvider>
      ) : (
        <HomeScreen startJoiningCall={startJoiningCall} />
      )}
    </div>
  );
}
