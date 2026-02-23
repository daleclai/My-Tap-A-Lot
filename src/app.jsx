import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import './App.css';
import { Homepage } from './homepage/homepage.jsx';
import { Store } from './store/store.jsx';
import { Ranking } from './ranking/ranking.jsx';
import { Settings } from './settings/settings.jsx';

export default function App() {
  const [score, setScore] = React.useState(0);
  React.useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      const savedScore = localStorage.getItem(`score_${userName}`);
      if (savedScore) {
        setScore(Number(savedScore));
      }
    }
  }, []);


  return (
    <BrowserRouter>
      <div className="app">

        <header className='top-bar'>
            <h1>Tap A Lot</h1>
             <div className='scores'>
                🪙 Scores: <span>{score}</span>
            </div>
            <NavLink to="/settings" className="nav settings">
                <img src='/gear.png' alt ='gear icon' className='gear-icon' />            
            </NavLink>
        </header>

        <Routes>
          <Route path="/" element={<Homepage score={score} setScore={setScore} />} />
          <Route path="/store" element={<Store  score={score} setScore={setScore}/>} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/settings" element={<Settings />} />
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
