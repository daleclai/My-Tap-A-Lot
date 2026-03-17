import React from 'react';
import './ranking.css';

export function Ranking() {
  const [rankings, setRankings] = React.useState([]);
  const [joke, setJoke] = React.useState('');

  React.useEffect(() => {
  fetch('/api/leaderboard')
    .then((r) => r.json())
    .then(setRankings)
    .catch(() => setRankings([]));

  fetch('/api/quote')
    .then((r) => r.json())
    .then((d) => setJoke(d.quote))
    .catch(() => setJoke('Keep tapping!'));
}, []);

  function getRankClass(index) {
    if (index === 0) return 'gold';
    if (index === 1) return 'silver';
    if (index === 2) return 'bronze';
    return 'rest';
  }

  function getDisplayName(email) {
    const namePart = email.split('@')[0];
    return namePart.length > 20 ? namePart.slice(0, 10) + '...' : namePart;
  }

  return (
    <div className="ranking_body">
      <div className="ranking_header">
        <header>
          <h1>Rankings</h1>
        </header>
      </div>
      
        <div className="jokeAPI">
            <p> {joke} </p>
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
            <span className="name">{getDisplayName(player.email)}</span>
            <span className="score">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}