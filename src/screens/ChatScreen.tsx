import React, { useContext } from 'react'
import {IDataContext, DataContext} from '../context/DataContext';

export const ChatScreen = () => {
  
  const context = useContext<IDataContext>(DataContext);
  
  return (
    <div>
      ChatScreen
      <p>{context.loading ? 'loading' : 'finished loading'}</p>
      <p>p: {context.dataManagement?.user?.name}</p>
      <p>c: {context.dataManagement?.user?.color}</p>
      <p>r: {context.dataManagement?.user?.role}</p>

      <p>counter: {context.dataManagement?.counter}</p>
      <button onClick={() => context.dataManagement?.setCounter(context.dataManagement.counter + 1)}>increase</button>
    </div>
  )
}
