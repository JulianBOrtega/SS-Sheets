import { BrowserRouter } from 'react-router-dom'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import { Navbar } from './components/NavBar/Navbar'
import { AppRoutes } from './routes/AppRoutes'
import CssBaseline from '@mui/joy/CssBaseline';
import DataProvider from './context/DataContext'
import './App.css'

function App() {
  return (
    <CssVarsProvider defaultMode='dark'>
      <CssBaseline />

      <DataProvider>
        <BrowserRouter>
        <div className="bg">
          <div className="app">
            <Navbar />
            <AppRoutes />
          </div>
        </div>
        </BrowserRouter>
      </DataProvider>
    </CssVarsProvider>
  )
}

export default App
