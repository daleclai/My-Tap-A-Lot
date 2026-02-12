import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './app'
import { Homepage } from './homepage/homepage'
import { Store } from './store/store'
import { Ranking } from './ranking/ranking'
import { Settings } from './settings/settings'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Homepage />} />
        <Route path="store" element={<Store />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
