import { useContext, useEffect, useRef, useState } from 'react';
import {IDataContext, DataContext} from '../context/DataContext';
import { ChatInput } from '../components/ChatScreen/ChatInput';
import { ICharacter } from '../interfaces/character';
import { ChatMsg } from '../components/ChatScreen/ChatMsg';
import { useLocation } from 'react-router-dom';

  //* DONE Allow to send chat with Enter/Intro

  //* DONE Let player update his character (onBlur/enter field)

  //* DONE Make sure a character being updated won't affect another 
  //* DONE That's being edited as well

  //* DONE Let player throw his dices
  //* DONE Display the dices in chat

  //* DONE Calculate EXP depending of level
  
  //* DONE Modify interfaces and create hardcoded classes
  //* DONE And replace classField to be a selector
  //* DONE Automatically calculate max hp

  // TODO Style chat

  // TODO Add option to export database (BACK & FRONT)

export const ChatScreen = () => {
  const { loading, dataManagement } = useContext<IDataContext>(DataContext);
  const location = useLocation();
  
  const [ready, setReady] = useState(false);
  const [availableCharas, setAvailableCharas] = useState<ICharacter[]>([]);
  const [character, setCharacter] = useState<ICharacter>();

  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [dataManagement, location]); 

  useEffect(() => {
    scrollToBottom()
  })

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
    <div style={{width: '100%', height: '100%'}}>
      <div>
        {dataManagement?.chats?.length == 0 ?
          <p>No hay mensajes</p>
        : dataManagement?.chats?.map((c, i) => (
          <ChatMsg key={'chat-' + c.id + '-' + i} 
            chatMsg={c}
            brighterBg={i % 2 == 0}
            user={dataManagement.user}
            characterList={dataManagement.characters}
          />
        ))}
      </div>

      <ChatInput 
        availableCharas={availableCharas}
        character={character}
        setCharacter={setCharacter}
      />

    <div style={{ float:"left", clear: "both" }} ref={messagesEndRef} />

    </div>
  ) : (
    <p>loading...</p>
  )
}
