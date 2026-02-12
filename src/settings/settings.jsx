import React from 'react';
import { NavLink } from 'react-router-dom';
import './settings.css';

export function Settings() {
  return (
    <main className="settings-page">
      <header className="settings-header">
        <h1>Settings</h1>
      </header>

      <section className="settings-content">
        <p>Create an account to save your taps!</p>

        <form className="settings-form">
          <div className="input-group">
            <input
              type="email"
              name="varEmail"
              required
              placeholder="Email"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="varPassword"
              required
              placeholder="Password"
            />
          </div>

          <div className="button-row">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button type="button" className="btn btn-secondary">
              Create
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
