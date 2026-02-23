import React from 'react';
import './homepage.css';
import { NavLink } from 'react-router-dom';

export function Homepage({ score, setScore }) {

  if (score === null) {
    return (
      <main className="homepage">
        <p>Please log in to play!</p>
      </main>
    );
  }
  function handleTap() {
  const userName = localStorage.getItem('userName');
  if (!userName || score === null) return; 

  const newScore = score + 1;
  setScore(newScore);
  localStorage.setItem(`score_${userName}`, newScore);
}

  return (
    <main className="game">
      <div className="main">
        <div className="button_base">
          <button className="big-red-button" onClick={handleTap}>
            <h3>TAP ME!</h3>
          </button>
        </div>
      </div>
    </main>
  );
}
