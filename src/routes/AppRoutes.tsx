import { Route, Routes } from 'react-router-dom'
import { ChatScreen } from '../screens/ChatScreen'
import { LogScreen } from '../screens/LogScreen'
import { SheetScreen } from '../screens/SheetScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { useContext } from 'react'
import { DataContext, IDataContext } from '../context/DataContext'

export const AppRoutes = () => {
  const { loading } = useContext<IDataContext>(DataContext)

  return !loading && (
    <div style={{
      width: 'calc(100% - 60px)',
      height: '100%',
    }}>
      <Routes>
        <Route path='/' element={<ChatScreen />}/>
        <Route path='/Sheets/:id' element={<SheetScreen />}/>
        <Route path='/Logs' element={<LogScreen />}/>
        <Route path='/Settings' element={<SettingsScreen />}/>
      </Routes>
    </div>
  )
}
