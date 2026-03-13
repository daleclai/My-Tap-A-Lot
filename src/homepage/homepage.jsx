import React from 'react';
import './homepage.css';
import { NavLink } from 'react-router-dom';

export function Homepage({ score, setScore, activeBackground, activeButtonSkin }) {

  if (score === null) {
    return (
      <main className="homepage">
        <p>Please log in to play!</p>
      </main>
    );
  }

  function handleTap() {
    if (score === null) return;
    setScore(score + 1);  
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
    </main>
  );
}
