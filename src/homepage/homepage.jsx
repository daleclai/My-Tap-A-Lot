import React from 'react';
import './homepage.css';

export function Homepage() {
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    const userName = localStorage.getItem('userName');

    if (userName) {
      const userScore = localStorage.getItem(`score_${userName}`);
      if (savedScore) {
        setScore(parseInt(userScore, 10));
      }
    }
  }, []);

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
          <button className="big-red-button">
            <h3>TAP ME!</h3>
          </button>
        </div>
      </div>
    </main>
  );
}
