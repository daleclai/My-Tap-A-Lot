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
      <div className="app">

        <header className='top-bar'>
            <h1>Tap A Lot</h1>
             <div className='scores'>
                🪙 Scores: <span>0</span>
            </div>
            <NavLink to="/settings" className="nav settings">
                Settings
            </NavLink>


        </header>

        {/*- page */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>

        {/* bottom nav */}
        <nav className="bottom-nav">
          <NavLink to="/" className="nav tap">Tap</NavLink>
          <NavLink to="/store" className="nav store">Store</NavLink>
          <NavLink to="/ranking" className="nav ranking">Rank</NavLink>        </nav>

        {/* ---------- FOOTER ---------- */}
        <footer>
          <p>Claire Daley</p>
          <a
            href="https://github.com/daleclai/My-Tap-A-Lot.git"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </footer>

      </div>
    </BrowserRouter>
  );
}
