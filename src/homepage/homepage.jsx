import React from 'react';
import './homepage.css';

export function Homepage() {
  return (
    <main className="game">
      <div className="main">
        <div className="button_base">
          <button className="big-red-button">
            <h3>TAP ME!</h3>
          </button>
        </div>
      </div>

      <nav className="bottom-nav">
        <NavLink className="nav tap" to="/">
          <h2>Tap</h2>
        </NavLink>

        <NavLink className="nav store" to="/store">
          <h2>Store</h2>
        </NavLink>

        <NavLink className="nav ranking" to="/ranking">
          <h2>Rank</h2>
        </NavLink>

        <NavLink className="nav settings" to="/settings">
          <h2>Settings</h2>
        </NavLink>
      </nav>
    </main>
  );
}
