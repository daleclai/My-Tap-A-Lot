import React from 'react';
import './homepage.css';

export function Homepage({ score, setScore }) {

  function handleTap() {
    const newScore = score + 1;
    setScore(newScore);
    
    const userName = localStorage.getItem('userName');
    if (userName) {
      localStorage.setItem(`score_${userName}`, newScore);
    }
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
