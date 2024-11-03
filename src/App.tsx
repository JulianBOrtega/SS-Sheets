import './App.css'
import { Navbar } from './components/Navbar'
import DataProvider from './context/DataContext'
import { AppRoutes } from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
