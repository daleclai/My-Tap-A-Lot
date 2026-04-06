import React, { useEffect, useRef, useState } from 'react';
import './homepage.css';
import { NavLink } from 'react-router-dom';

export function Homepage({ score, setScore, activeBackground, activeButtonSkin, userName }) {
  const [feed, setFeed] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setFeed((prevFeed) => [data, ...prevFeed]);
    };

    return () => {
      socket.close();
    };
  }, []);
  
  
  if (score === null) {
    return (
      <main className="homepage">
        <p>⚙️ Log in via Settings to play!</p>
      </main>
    );
  }

  function handleTap() {
    if (score === null) return;
    const newScore = score + 1;
    setScore(newScore); 
    
    if (newScore % 100 === 0 && socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
          text: `${userName.split('@')[0]} just hit ${newScore} taps! 🎉`,
        }));
      }
    }


  return (
    <main className={`game ${activeBackground ?? ''}`}>
      <div className="main">
        <div className="button_base">
          <button
            className={`big-red-button ${activeButtonSkin ?? ''}`}
            onClick={handleTap}
          >
            <h3>TAP ME!</h3>
          </button>
        </div>
      </div>
      {feed.length > 0 && (
        <div className="feed">
          <h4> 🔴 Live</h4>
          <ul>
            {feed.map((data, index) => (
              <li key={index}>{data.text}</li>
            ))}
          </ul>
        </div>
      )}

    </main>
  );
}
