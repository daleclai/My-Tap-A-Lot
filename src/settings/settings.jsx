import React from 'react';
import './settings.css';

export function Settings(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const isLoggedIn = !!props.userName;

  function handleLogin() {
    props.onLogin(email);
    setPassword('');
  }

  function handleCreate() {
    props.onLogin(email);
    setPassword('');
  }

  function handleLogout() {
    props.onLogout();
    setEmail('');
    setPassword('');
  }

  return (
    <main className="settings-page">
      <header className="settings-header">
        <h1>Settings</h1>
      </header>

      <section className="settings-content">

        {isLoggedIn && <h2>Welcome, {props.userName}!</h2>}

        {!isLoggedIn && (
          <>
            <p>Create an account to save your taps!</p>

            <form className="settings-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="button-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogin}
                  disabled={!email || !password}
                >
                  Login
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCreate}
                  disabled={!email || !password}
                >
                  Create
                </button>
              </div>
            </form>
          </>
        )}

        {isLoggedIn && (
          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      </section>
    </main>
  );
}