import React from 'react';
import './HomeScreen.css';

export default function HomeScreen({ startJoiningCall }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { roomUrl, userName, selectedModel } = Object.fromEntries(formData.entries());
    startJoiningCall(roomUrl, userName, selectedModel);
  };

  return (
    <div className="home-screen">
      <h1>Daily React 🤝 TensorFlowJS </h1>
      <p>Start the demo by entering your room URL below.</p>
      <form method="post" onSubmit={handleSubmit} className="form">
        <label htmlFor="userName">User name</label>
        <input type="text" id="userName" name="userName" defaultValue="Billie Jean" />
        <label htmlFor="selectedModel">Choose type of detection</label>
        <select name="selectedModel" id="selectedModel">
          <option value="gesture-detection">Gesture (hand) detection</option>
          <option value="object-detection">Object detection</option>
        </select>
        <label htmlFor="roomUrl">Room URL</label>
        <input
          type="text"
          id="roomUrl"
          name="roomUrl"
          defaultValue="https://your-domain.daily.co/your-room"
        />
        <button style={{ marginTop: '1rem' }} type="submit">
          Start call
        </button>
      </form>
      <p className="small">Select “Allow” to use your camera and mic for this call if prompted</p>
    </div>
  );
}
