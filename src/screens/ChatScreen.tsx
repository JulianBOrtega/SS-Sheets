import { useContext, useEffect, useRef, useState } from 'react';
import {IDataContext, DataContext} from '../context/DataContext';
import { ChatInput } from '../components/ChatScreen/ChatInput';
import { ICharacter } from '../interfaces/character';
import { ChatMsg } from '../components/ChatScreen/ChatMsg';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress/CircularProgress';
import ghost from '../assets/img/ghost.png'

//* Add button to clear chart

// TODO Add option to export database (BACK & FRONT)
//? https://uploadcare.com/docs/start/quickstart/
//? https://uploadcare.com/api/

// TODO Add option to upload image
//? https://www.npmjs.com/package/react-image-crop
//? https://codesandbox.io/p/sandbox/react-image-crop-demo-with-react-hooks-y831o?file=%2Fsrc%2FApp.tsx

// TODO Decide to store them in the cloud or the backend
//? Uploadcare
//? https://uploadcare.com/cdn/image-cdn/

//? Picasa Web Albums Data API
//? https://developers.google.com/photos

export const ChatScreen = () => {
  const { loading, dataManagement } = useContext<IDataContext>(DataContext);
  const location = useLocation();
  
  const [ready, setReady] = useState(false);
  const [availableCharas, setAvailableCharas] = useState<ICharacter[]>([]);
  const [character, setCharacter] = useState<ICharacter>();
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
    if(result.length > 0) {
        setCharacter(result[0]);
    }

    setReady(true);
  }, [loading, dataManagement]);
  
  return ready ? (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div ref={chatRef} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'calc(100% - 160px)',
        overflowY: 'auto'
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
        character={character}
        setCharacter={setCharacter}
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
