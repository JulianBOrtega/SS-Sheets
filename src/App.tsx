import { BrowserRouter } from 'react-router-dom'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import { Navbar } from './components/NavBar/Navbar'
import { AppRoutes } from './routes/AppRoutes'
import CssBaseline from '@mui/joy/CssBaseline';
import DataProvider from './context/DataContext'
import './App.css'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

function App() {
  return (
    <CssVarsProvider defaultMode='dark'>
      <CssBaseline />

      <DataProvider>
        <BrowserRouter>
          <div className="app" style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
          }}>
            <Navbar />
            <AppRoutes />
          </div>
        </BrowserRouter>
      </DataProvider>
    </CssVarsProvider>
  )
}

export default App
