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

async function loadUserData() {
  const res = await fetch('/api/score');
  if (res.ok) {
    const data = await res.json();
    setScore(data.score);
  }
}

React.useEffect(() => {
  if (!userName || score === null) return;
  fetch('/api/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score }),
  }).catch(console.error);
}, [score, userName]);



async function login(email, password, isNew) {
  const endpoint = isNew ? '/api/auth/create' : '/api/auth/login';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const { msg } = await res.json();
    throw new Error(msg);
  }
  const data = await res.json();
  setUserName(data.email);
  await loadUserData();
}

React.useEffect(() => {
  fetch('/api/auth/me')
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (data?.email) {
        setUserName(data.email);
        loadUserData();
      }
    })
    .catch(() => {});
}, []);

async function logout() {
  await fetch('/api/auth/logout', { method: 'DELETE' });
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
