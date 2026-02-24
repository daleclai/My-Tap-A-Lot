import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import './App.css';
import { Homepage } from './homepage/homepage.jsx';
import { Store } from './store/store.jsx';
import { Ranking } from './ranking/ranking.jsx';
import { Settings } from './settings/settings.jsx';

export default function App() {
  const [userName, setUserName] = React.useState(null);
  const [score, setScore] = React.useState(null);
  const [activeBackground, setActiveBackground] = React.useState(null);
  const [activeButtonSkin, setActiveButtonSkin] = React.useState(null);

React.useEffect(() => {
  const storedUser = localStorage.getItem('userName');
  setUserName(storedUser);
}, []);

React.useEffect(() => {
  if (!userName) return;

  const storedBackground = localStorage.getItem(`activeBackground_${userName}`);
  if (storedBackground) setActiveBackground(storedBackground);

  const storedButton = localStorage.getItem(`activeButtonSkin_${userName}`);
  if (storedButton) setActiveButtonSkin(storedButton);

  const storedScore = parseInt(localStorage.getItem(`score_${userName}`)) || 0;
  setScore(storedScore);
}, [userName]);

React.useEffect(() => {
  if (!userName || score === null) return;
  localStorage.setItem(`score_${userName}`, score);
}, [score, userName]);

function login(name) {
  localStorage.setItem('userName', name);
  setUserName(name);

  const storedScore = parseInt(localStorage.getItem(`score_${name}`)) || 0;
  setScore(storedScore);

  const storedBackground = localStorage.getItem(`activeBackground_${name}`);
  if (storedBackground) setActiveBackground(storedBackground);

  const storedButton = localStorage.getItem(`activeButtonSkin_${name}`);
  if (storedButton) setActiveButtonSkin(storedButton);
}

function logout() {
  localStorage.removeItem('userName');
  setUserName(null);
  setScore(null);
  setActiveBackground(null);
  setActiveButtonSkin(null);
}


  return (
    <BrowserRouter>
      <div className="app">

        <header className='top-bar'>
            <h1>Tap A Lot</h1>
             <div className='scores'>
                🪙 Scores: {' '}
                <span>
                  {score === null ? '--' : score}
                </span>
            </div> 
            <NavLink to="/settings" className="nav settings">
                <img src='/gear.png' alt ='gear icon' className='gear-icon' />            
            </NavLink>
        </header>

        <Routes>
          <Route
          path="/"
          element={
            <Homepage
              score={score}
              setScore={setScore}
              activeBackground={activeBackground}
              activeButtonSkin={activeButtonSkin}
            />
          }
        />

        <Route
          path="/store"
          element={
            <Store
              score={score}
              setScore={setScore}
              activeBackground={activeBackground}
              setActiveBackground={setActiveBackground}
              activeButtonSkin={activeButtonSkin}
              setActiveButtonSkin={setActiveButtonSkin}
            />
          }
        />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/settings" element={<Settings userName={userName} onLogin={login} onLogout={logout} />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>

        <nav className="bottom-nav">
            <NavLink to="/" className="nav tap">
                <img src='/tap.png' alt ='tap icon' className='tap-icon' />
                <span>Tap</span>
            </NavLink>

            <NavLink to="/store" className="nav store">
                <img src='/store.png' alt ='store icon' className='store-icon' />                
                <span>Store</span>
            </NavLink>

            <NavLink to="/ranking" className="nav ranking">
                <img src='/rank.png' alt ='rank icon' className='rank-icon' />
                <span>Ranking</span>
            </NavLink>   

        </nav>

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
