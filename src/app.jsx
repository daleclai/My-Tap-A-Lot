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

        <footer>
          <p>Claire Daley</p>
          <p>
            <a href="https://github.com/daleclai/My-Tap-A-Lot.git">GitHub</a>
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
