import { useContext, useEffect, useState } from 'react';
import {IDataContext, DataContext} from '../context/DataContext';
import { ChatInput } from '../components/ChatScreen/ChatInput';
import { ICharacter } from '../interfaces/character';

  //* DONE Allow to send chat with Enter/Intro

  //* DONE Let player update his character (onBlur/enter field)

  //* DONE Make sure a character being updated won't affect another 
  //* DONE That's being edited as well

  // TODO Let player throw his dices
  // TODO Display the dices in chat

  // TODO Calculate EXP depending of level
  
  // TODO Modify interfaces and create hardcoded classes
  // TODO In the frontend to calculate max hp

  // TODO Style chat

  // TODO Add option to export database (BACK & FRONT)

export const ChatScreen = () => {
  
  const { loading, dataManagement } = useContext<IDataContext>(DataContext);
  
  const [ready, setReady] = useState(false);
  const [availableCharas, setAvailableCharas] = useState<ICharacter[]>([]);
  const [character, setCharacter] = useState<ICharacter>();

  useEffect(() => {
    if(loading || !dataManagement || !dataManagement.characters || !dataManagement.user) return;

    const dm = dataManagement.user.role == 'GM';
    const userId = dataManagement.user.id;
    const result = dataManagement.characters.filter(c => {
        return dm || c.userId == userId
    }) || [];

    setAvailableCharas(result);
    if(result.length > 0) {
        setCharacter(result[0]);
    }

    setReady(true);
  }, [loading, dataManagement]);
  
  return ready ? (
    <div style={{width: '85%'}}>
      ChatScreen

      <p>{dataManagement?.user?.id}</p>
      
      {dataManagement?.chats?.length == 0 ?
        <p>Chat empty</p>
      : dataManagement?.chats?.map((c, i) => (
        <p key={'chat-' + c.id + '-' + i}>{c.id} {c.msg}</p>
      ))}

      <ChatInput 
        availableCharas={availableCharas}
        character={character}
        setCharacter={setCharacter}
      />

    </div>
  ) : (
    <p>loading...</p>
  )
}
