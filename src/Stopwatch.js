import React, { useState, useEffect, useRef } from 'react';

function Stopwatch({ onLogout }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // cleanup
  }, []);

  const toggleStart = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch</h1>
      <h2>{formatTime()}</h2>
      <button onClick={toggleStart}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Stopwatch;
