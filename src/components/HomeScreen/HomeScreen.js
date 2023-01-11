import React from 'react';
import './HomeScreen.css';

export default function HomeScreen({ startJoiningCall }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { roomUrl, userName } = Object.fromEntries(formData.entries());
    startJoiningCall(roomUrl, userName);
  };

  return (
    <div className="home-screen">
      <h1>Daily React 🤝 TensorFlowJS </h1>
      <p>Start the demo by entering your room URL below.</p>
      <form method="post" onSubmit={handleSubmit} className="url-form">
        <label htmlFor="userName">User name</label>
        <input type="text" id="userName" name="userName" defaultValue="Billie Jean" />
        <label htmlFor="roomUrl">Room URL (must be a room that has prejoin disabled)</label>
        <input
          type="text"
          id="roomUrl"
          name="roomUrl"
          defaultValue="https://your-domain.daily.co/your-room"
        />
        <button type="submit">Start call</button>
      </form>
      <p className="small">Select “Allow” to use your camera and mic for this call if prompted</p>
    </div>
  );
}
