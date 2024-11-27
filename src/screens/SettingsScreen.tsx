import React, { useContext, useRef } from 'react'
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { Backup } from '../components/SettingsScreen/Backup';
import { BaseDeDatos } from '../components/SettingsScreen/BaseDeDatos';
import { DataContext, IDataContext } from '../context/DataContext';
import { UseBackup } from '../hooks/UseBackup';

export const SettingsScreen = () => {
  const { loading, dataManagement, broadcast } = useContext<IDataContext>(DataContext);
  
  const {
    loading: loadingBackup, info, handleFileChange, 
    triggerBackup, restoreBackup
  } = UseBackup(
    'characters', dataManagement?.roomId, dataManagement?.characters
  );

  const url = useRef<string>(import.meta.env.VITE_API_URL);

  const clearChat = () => {
    if(loading || !dataManagement || !dataManagement.roomId) return;

    const campaign = dataManagement.roomId;
    const fetchOps = {
      method: 'DELETE'
    };

    fetch(`${url.current}chats/clearHistory/${campaign}`, fetchOps)
    .then(res => res.json()).then(data => broadcast.update('chats'))
    .catch(err => console.log('ERROR at deleting chat', err));
  }

  return (
    <div className="settingsScreen" style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '98%',
      overflowY: 'auto',
      padding: 10
    }}>
      <p style={{
        fontSize: 18,
        fontWeight: 500,
        
      }}>Opciones</p>

      <p style={{fontSize: 12, color: 'gray', marginBottom: 15}}>
        Limpiar la base de datos, realizar backups, importar datos, etc.
      </p>

      <AccordionGroup size={'sm'}>
        {
          (dataManagement?.user && dataManagement?.user.role == 'GM') && (
            <Accordion>
              <AccordionSummary style={{
                border: 'solid 1px rgba(100, 100, 100, 0.35)',
              }}>
                <p>Base de datos</p>
                <p style={{fontSize: 12, color: 'gray'}}>
                  Afecta a todos los jugadores (Visible solo para DMs)
                </p>
              </AccordionSummary>
              <AccordionDetails style={{
                background: 'rgba(100, 100, 100, 0.35)'
              }}>
                <BaseDeDatos 
                  loading={loading || loadingBackup}
                  info={info}
                  restoreBackup={restoreBackup}
                  clearChat={clearChat}
                />
              </AccordionDetails>
            </Accordion>
          )
        }
        
        <Accordion>
          <AccordionSummary style={{
            borderBottom: 'solid 1px rgba(100, 100, 100, 0.35)',
            borderLeft: 'solid 1px rgba(100, 100, 100, 0.35)',
            borderRight: 'solid 1px rgba(100, 100, 100, 0.35)'
          }}>
            <p>Backup</p>
            <p style={{fontSize: 12, color: 'gray'}}>
              Respalda los datos de la campaña (DM puede restaurar los datos)
            </p>
          </AccordionSummary>
          <AccordionDetails style={{
            background: 'rgba(100, 100, 100, 0.35)'
          }}>
            <Backup 
              loading={loading || loadingBackup}
              triggerBackup={triggerBackup}
              info={info}
            />
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary style={{
            borderBottom: 'solid 1px rgba(100, 100, 100, 0.35)',
            borderLeft: 'solid 1px rgba(100, 100, 100, 0.35)',
            borderRight: 'solid 1px rgba(100, 100, 100, 0.35)'
          }}>
            <p>Información adicional</p>
            <p style={{fontSize: 12, color: 'gray'}}>
              Datos para el desarrollador
            </p>
          </AccordionSummary>
          <AccordionDetails style={{
            background: 'rgba(100, 100, 100, 0.35)'
          }}>
            <p>Campaign ID</p>
            <p style={{fontSize: 12, color: 'gray'}}>
              {dataManagement?.roomId}
            </p>
            
            <div style={{ 
              borderBottom: 'solid 1px rgba(100, 100, 100, 0.3)',
              marginTop: 5, marginBottom: 5
            }}/>

            <p>CharacterBackup ID</p>
            <p style={{fontSize: 12, color: 'gray'}}>
              {info?.id ? info.id : 'Null'}
            </p>

            <div style={{ 
              borderBottom: 'solid 1px rgba(100, 100, 100, 0.3)',
              marginTop: 5, marginBottom: 5
            }}/>

            <p>User ID / Role</p>
            <p style={{fontSize: 12, color: 'gray'}}>
              {dataManagement?.user?.id} / {dataManagement?.user?.role}
            </p>
            
            <div style={{ 
              borderBottom: 'solid 1px rgba(100, 100, 100, 0.3)',
              marginTop: 5, marginBottom: 5
            }}/>

            <p>Frontend url</p>
            <a style={{fontSize: 12, color: 'gray'}} 
              href={window.location.href.replace('Settings', '')} 
              target="_blank"
            >
              {window.location.href.replace('Settings', '')}
            </a>

            <div style={{ 
              borderBottom: 'solid 1px rgba(100, 100, 100, 0.3)',
              marginTop: 5, marginBottom: 5
            }}/>

            <p>Backend url</p>
            <a style={{fontSize: 12, color: 'gray'}}
              href={url.current}
              target="_blank"
            >
              {url.current}
            </a>

            <div style={{ 
              borderBottom: 'solid 1px rgba(100, 100, 100, 0.3)',
              marginTop: 5, marginBottom: 5
            }}/>

            <p>Currently in memory</p>
            <p style={{fontSize: 12, color: 'gray'}}>
              Characters: {dataManagement?.characters?.length} | Chats: {dataManagement?.chats?.length}
            </p>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </div>
  )
}
