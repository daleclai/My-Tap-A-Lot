import React from 'react';
import './ranking.css';

export function Ranking() {
  const [rankings, setRankings] = React.useState([]);

  React.useEffect(() => {
    const users = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key.startsWith('score_')) {
        const email = key.replace('score_', '');
        const score = parseInt(localStorage.getItem(key)) || 0;

        users.push({ email, score });
      }
    }

    users.sort((a, b) => b.score - a.score);

    setRankings(users);
  }, []);

  // Determine row color based on rank
  function getRankClass(index) {
    if (index === 0) return 'gold';
    if (index === 1) return 'silver';
    if (index === 2) return 'bronze';
    return 'rest'; // orange
  }

  return (
    <div className="ranking_body">
      <div className="ranking_header">
        <header>
          <h1>Rankings</h1>
        </header>
      </div>

      <div className="ranks">
        {rankings.length === 0 && (
          <p className="no_scores">No players yet</p>
        )}

        {rankings.map((player, index) => (
          <div
            key={player.email}
            className={`row ${getRankClass(index)}`}
          >
            <span className="rank">
              {index < 3 ? '🏆' : index + 1} {index + 1}
            </span>
            <span className="name">{player.email}</span>
            <span className="score">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}