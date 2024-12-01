import { useContext, useEffect, useRef, useState } from 'react';
import {IDataContext, DataContext} from '../context/DataContext';
import { ChatInput } from '../components/ChatScreen/ChatInput';
import { ICharacter } from '../interfaces/character';
import { ChatMsg } from '../components/ChatScreen/ChatMsg';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress/CircularProgress';
import ghost from '../assets/img/ghost.png'

//* DONE Create database using mongoDB
//* DONE Add character images to navbar
//* DONE Add character images to chat
//* DONE Fix bug of sending empty chat as 'Lanzó dados'
//* DONE Fix bug of changing characters when you're using the 2nd
//* DONE Allow DM to send messages without a sheet
// TODO Fix bug of not allowing to upload a 2nd or 3rd image without refreshing

export const ChatScreen = () => {
  const { loading, dataManagement, speakingAs, setSpeakingAs } = useContext<IDataContext>(DataContext);
  const location = useLocation();
  
  const [ready, setReady] = useState(false);
  const [availableCharas, setAvailableCharas] = useState<ICharacter[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(chatRef.current) {
      chatRef.current.scrollTo({
        left: 0,
        top: chatRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [dataManagement, location]); 

  useEffect(() => {
    if(chatRef.current) {
      chatRef.current.scrollTo({
        left: 0,
        top: chatRef.current.scrollHeight,
        behavior: 'instant'
      });
    }
  })

  useEffect(() => {
    if(loading || !dataManagement || !dataManagement.characters || !dataManagement.user) return;

    const dm = dataManagement.user.role == 'GM';
    const userId = dataManagement.user.id;
    const result = dataManagement.characters.filter(c => {
        return dm || c.userId == userId
    }) || [];

    setAvailableCharas(result);
    if(result.length > 0 && !speakingAs && dataManagement.user.role != 'GM') {
        setSpeakingAs(result[0]);
        console.log('Sets default');
    }

    setReady(true);
  }, [loading, dataManagement]);
  
  return ready ? (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'black'
    }}>
      <div ref={chatRef} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'calc(100% - 160px)',
        overflowY: 'auto',
      }}>
          {dataManagement?.chats?.length == 0 ?
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5
            }}>
              <img src={ghost} alt="emptyChat" 
                width={100} height={100}
              />
              <p>El chat está vacío.</p>
            </div>
          : dataManagement?.chats?.slice(-50).map((c, i) => (
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
      />
    </div>
  ) : (
    <div style={{
      width: '100%', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 15
      }}
    >
      <CircularProgress />
      <p style={{textAlign: 'center'}}>
        Si la extensión no fue abierta en varios días, <br/>
        puede tomar un par de minutos en cargar por primera vez.
      </p>
    </div>
  )
}
