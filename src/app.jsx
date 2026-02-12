import './app.css'
import { NavLink, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="game">
      {/*  header  */}
      <header>
        <div className="top-bar">
          <h1>Tap A Lot</h1>

          <div className="scores">
            🪙 Scores: <span>0</span>
          </div>

          <NavLink to="/settings">
            <button className="setting">
              <img
                src="https://www.pikpng.com/pngl/b/283-2837391_settings-vector-mobile-setting-icone-de-configurao-png.png"
                alt="Settings"
                width="25"
                height="25"
              />
            </button>
          </NavLink>
        </div>
      </header>

      {/*  page content (changes per route) */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/*  bottom nav  */}
      <nav className="bottom-nav">
        <NavLink to="/" className="nav tap">
          <h2>Tap</h2>
        </NavLink>

        <NavLink to="/store" className="nav store">
          <h2>Store</h2>
        </NavLink>

        <NavLink to="/ranking" className="nav ranking">
          <h2>Rank</h2>
        </NavLink>
      </nav>

      {/* ===== FOOTER ===== */}
      <footer>
        <p>Claire Daley</p>
        <a href="https://github.com/daleclai/My-Tap-A-Lot.git">GitHub</a>
      </footer>
    </div>
  )
}

