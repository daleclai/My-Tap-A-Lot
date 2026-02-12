import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import './App.css';
import { Homepage } from './homepage/homepage.jsx';
import { Store } from './store/store.jsx';
import { Ranking } from './ranking/ranking.jsx';
import { Settings } from './settings/settings.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header>
          <div className="top-bar">
            <h1>Tap A Lot</h1>
            <div className="scores">
              🪙 Scores: <span id="countscore">0</span>
            </div>
          </div>
        </header>

        {/* Routes render the page components */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<div className="container">404: Page not found</div>} />
        </Routes>

        <nav className="bottom-nav">
  <NavLink to="/">
    <button className="nav tap">
      <img
        src="/tap.png"
        alt="Tap icon"
        width="50"
        height="50"
      />
      <h2>Tap</h2>
    </button>
  </NavLink>

  <NavLink to="/store">
    <button className="nav store">
      <img
        src="/store.png"
        alt="Store icon"
        width="50"
        height="50"
      />
      <h2>Store</h2>
    </button>
  </NavLink>

  <NavLink to="/ranking">
    <button className="nav ranking">
      <img
        src="/ranking.png"
        alt="Ranking icon"
        width="50"
        height="50"
      />
      <h2>Rank</h2>
    </button>
  </NavLink>
</nav>

      </div>
    </BrowserRouter>
  );
}
