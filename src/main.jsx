import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/tokens.css'
import './styles/base.css'

// React Router basename matches Vite's BASE so the app works on
// github.io/laura-cordrey-site/ and on a custom domain (set to '/').
const BASENAME = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={BASENAME}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
