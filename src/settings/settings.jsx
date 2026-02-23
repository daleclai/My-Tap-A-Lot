import React from 'react';
import { NavLink } from 'react-router-dom';
import './settings.css';

export function Settings(props) {
  const [email, setEmail] = React.useState(props.userName || '');
  const [password, setPassword] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (props.userName) {
      setIsLoggedIn(true);
    }
  }, [props.userName]);
  
  function loginUser() {
    localStorage.setItem('userName', email);
    setIsLoggedIn(true);
  }

  function createUser() {
    localStorage.setItem('userName', email);
    setIsLoggedIn(true);
  }

  return (
    <main className="settings-page">
      <header className="settings-header">
        <h1>Settings</h1>
      </header>

      <section className="settings-content">


        {isLoggedIn ? (
          <h2>Welcome, {email}!</h2>
        ) : (
          
        <>
        <p>Create an account to save your taps!</p>

        <form className="settings-form">

          <div className="input-group">
            <input
              type="email"
              name="varEmail"
              required placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="varPassword"
              required placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="button-row">
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={loginUser}
              disabled={!email || !password}>
              Login
            </button>

            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={createUser}
              disabled={!email || !password}>
              Create
            </button>
          </div>
        </form>
        </>
        )}
      </section>
    </main>
  );
}
