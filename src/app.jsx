import './app.css'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="game">
      <header>{/* top-bar here */}</header>

      <main>
        <Outlet />
      </main>

      <nav className="bottom-nav">{/* nav buttons */}</nav>
      <footer>{/* footer */}</footer>
    </div>
  )
}
