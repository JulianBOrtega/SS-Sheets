import { StrictMode, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const url = useRef(import.meta.env.VITE_API_URL);
useEffect(() => {
  
  console.log('BACKEND URL', url.current);
}, []);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
