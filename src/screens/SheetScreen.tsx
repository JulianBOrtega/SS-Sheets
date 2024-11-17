import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataContext, IDataContext } from "../context/DataContext";
import { Navigate, useParams } from 'react-router-dom';
import { UseCharacter } from '../hooks/synchedFetch/UseCharacter';
import CircularProgress from '@mui/joy/CircularProgress';
import { CharaHeader } from '../components/SheetScreen/CharaHeader';
import { Stats } from '../components/SheetScreen/Stats';
import { Inventory } from '../components/SheetScreen/Inventory';
import { Bonds } from '../components/SheetScreen/Bonds';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { InDevelopment } from '../components/shared/InDevelopment';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { generateChatMsg } from '../utility/objTemplates';
import { SuccessLevel } from '../utility/dice';

export const SheetScreen = (props: any) => {
  const { loading, dataManagement, broadcast } = useContext<IDataContext>(DataContext);
  const { id } = useParams();
  const charaFetch = UseCharacter(id ? id : undefined);
  
  //? States
  const [changeCounter, setChangeCounter] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [editable, setEditable] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const url = useRef<string>(import.meta.env.VITE_API_URL);
  
  const updateCharacter = () => {
    if(loading || !dataManagement || !dataManagement.user || !charaFetch.character || !charaFetch.character.id) return;

    const campaign = dataManagement.roomId;
    const fetchOps = {
        method: 'POST', body: JSON.stringify(charaFetch.character),
        headers: {
            'Content-type': 'application/json'
        }
    };

    fetch(`${url.current}characters/${campaign}`, fetchOps)
    .then(res => res.json()).then(data => broadcast.update('characters'))
    .catch(err => console.log('ERROR at updating characters', err));
  }

  const deleteSheet = () => {
    if(loading || !dataManagement || !dataManagement.user || !charaFetch.character || !charaFetch.character.id) return;

    const campaign = dataManagement.roomId;
    const fetchOps = { method: 'DELETE' };
    const id = charaFetch.character.id;

    fetch(`${url.current}characters?campaignId=${campaign}&characterId=${id}`, fetchOps)
    .then(res => res.json()).then(data => broadcast.update('characters'))
    .catch(err => console.log('ERROR at deleting character', id, err));

    setDeleteModal(false);
    setRedirect(true);
  }

  const sendRoll = (msg: string, roll: string, successLevel?: SuccessLevel) => {
      if(loading || !dataManagement || !dataManagement.user || !charaFetch.character || !charaFetch.character.id) return;
      
      const campaign = dataManagement.roomId;
      const userId = dataManagement.user.id;
      const charaId = charaFetch.character.id;
      const chatRoll = generateChatMsg(
        userId, charaId, msg, false, roll, successLevel
      );
      const fetchOps = {
          method: 'POST', body: JSON.stringify(chatRoll),
          headers: {
              'Content-type': 'application/json'
          }
      };

      fetch(`${url.current}chats/${campaign}`, fetchOps)
      .then(res => res.json()).then(data => broadcast.update('chats'))
      .catch(err => console.log('ERROR at adding new chat', err));
  };

  useEffect(() => {
    if(changeCounter == 0) return;

    updateCharacter();
    setChangeCounter(0);
  }, [editable]);

  return charaFetch.loading ? (
    <div style={{ 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </div>
  ) : charaFetch.character ? (
    <>
      <div style={{
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
      }}>
        <Tabs aria-label="Basic tabs" defaultValue={0} size={'sm'} 
        style={{background: 'transparent'}}>
          <TabList tabFlex={'auto'} style={{background: 'transparent', width: '99%'}}>
            <Tab style={{background: 'transparent'}}>Ficha</Tab>
            <Tab style={{background: 'transparent'}}>Movimientos</Tab>
            <Tab style={{background: 'transparent'}}>Clase</Tab>
            <Tab style={{background: 'transparent'}}>Hechizos</Tab>
            <Tab style={{background: 'transparent'}}>Tienda</Tab>
            <Tab style={{background: 'transparent'}}>Notas</Tab>
          </TabList>

          <TabPanel value={0}>
            <div style={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: 10,
                width: '99%',
                height: '100%'
              }}>
              <CharaHeader 
                data={charaFetch.character}
                notifyChange={() => setChangeCounter(changeCounter+1)}
                editable={editable}
                setEditable={setEditable}
                sendStatRoll={sendRoll}
              />
              <Stats 
                data={charaFetch.character}
                editable={editable}
                notifyChange={() => setChangeCounter(changeCounter+1)}
                sendStatRoll={sendRoll}
              />
              {/* <Inventory /> */}
              {/* <Bonds /> */}
              
              {( !editable &&
                <Button color='danger'
                variant='soft' 
                onClick={() => setDeleteModal(true)}
                >
                  Eliminar ficha
                </Button>
              )}

              <Modal 
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
              >
                <ModalDialog
                  layout="center"
                  size="md"
                  variant="outlined"
                >
                  <ModalClose />
                  <Typography>¿Estás seguro? <br /> La ficha será eliminada. </Typography>
                  
                  <Button color='danger' onClick={deleteSheet}>
                    Si, puta
                  </Button>
                  
                  <Button variant='outlined' color='danger' onClick={() => setDeleteModal(false)}>
                    Cancelar
                  </Button>
                </ModalDialog>
              </Modal>

              {
                redirect && <Navigate to='/' />
              }
            </div>
          </TabPanel>

          <TabPanel value={1}>
            <div style={{position: 'relative', top: 75}}>
              <InDevelopment />
            </div>
          </TabPanel>

          <TabPanel value={2}>
            <div style={{position: 'relative', top: 75}}>
              <InDevelopment />
            </div>
          </TabPanel>

          <TabPanel value={3}>
            <div style={{position: 'relative', top: 75}}>
              <InDevelopment />
            </div>
          </TabPanel>

          <TabPanel value={4}>
            <div style={{position: 'relative', top: 75}}>
              <InDevelopment />
            </div>
          </TabPanel>

          <TabPanel value={5}>
            <div style={{position: 'relative', top: 75}}>
              <InDevelopment />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  ) : (
    <div style={{
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}
    >
      <p>Character not found.</p>
    </div>
  )
}
