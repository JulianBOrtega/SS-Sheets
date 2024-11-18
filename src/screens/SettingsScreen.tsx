import React, { useContext, useRef } from 'react'
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { Backup } from '../components/SettingsScreen/Backup';
import { BaseDeDatos } from '../components/SettingsScreen/BaseDeDatos';
import { DataContext, IDataContext } from '../context/DataContext';

export const SettingsScreen = () => {
  const { loading, dataManagement, broadcast } = useContext<IDataContext>(DataContext);
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
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
              Respalda los datos de la campaña (y pidele a tu DM que los suba)
            </p>
          </AccordionSummary>
          <AccordionDetails style={{
            background: 'rgba(100, 100, 100, 0.35)'
          }}>
            <Backup />
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </div>
  )
}
