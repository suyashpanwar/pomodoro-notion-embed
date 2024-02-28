// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(50 * 60); // Initial time is 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [type, setType] = useState('pomo'); // Default type is pomo
  const [audio] = useState(new Audio('path/to/sound.mp3')); // Replace with the path to your sound file

  useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      handleReset();
      audio.play(); // Play the sound when the timer reaches 0
    }

    return () => clearInterval(interval);
  }, [isActive, time, audio]);

  const handleStartPause = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setType('pomo');
    setTime(50 * 60);
  };

  const handleTypeChange = (newType, newTime) => {
    setType(newType);
    setTime(newTime);
  };

  return (
    <div className="app">
      <div className="sections">
        <button onClick={() => handleTypeChange('pomo', 50 * 60)}>Pomo</button>
        <button onClick={() => handleTypeChange('shortBreak', 5 * 60)}>Short</button>
        <button onClick={() => handleTypeChange('longBreak', 10 * 60)}>Long</button>
      </div>

      <div className="timer">
        <p>{Math.floor(time / 60)}:{(time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</p>
      </div>

      <div className="controls">
        <button onClick={handleStartPause}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
