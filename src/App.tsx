import { BrowserRouter } from 'react-router-dom'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import { Navbar } from './components/NavBar/Navbar'
import { AppRoutes } from './routes/AppRoutes'
import CssBaseline from '@mui/joy/CssBaseline';
import DataProvider from './context/DataContext'
import './App.css'
import { useEffect, useRef } from 'react';

function App() {
  const url = useRef(import.meta.env.VITE_API_URL);
  useEffect(() => {  
    console.log('BACKEND URL', url.current);
    console.log('IMPORT.META.ENV', import.meta.env)
  }, []);

  return (
    <CssVarsProvider defaultMode='dark'>
      <CssBaseline />

      {/* <DataProvider>
        <BrowserRouter>
        <div className="bg">
          <div className="app">
            <Navbar />
            <AppRoutes />
          </div>
        </div>
        </BrowserRouter>
      </DataProvider> */}
      <p>test</p>
    </CssVarsProvider>
  )
}

export default App
