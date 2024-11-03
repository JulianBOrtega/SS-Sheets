import OBR from '@owlbear-rodeo/sdk';
import { useState, useEffect } from 'react';
import { IUser } from '../interfaces/user';

export interface IDataManagement {
  loading: boolean,
  roomId: string,
  user?: IUser,

  counter: number,
  setCounter: (value: number) => void
}

export const UseDataManagement = (ready: boolean): IDataManagement => {
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState<string>('-1');
  const [user, setUser] = useState<IUser>();

  const updatePlayerData = () => {
    Promise.all([
      OBR.player.getName(),
      OBR.player.getColor(),
      OBR.player.getRole()
    ]).then((res) => {
      setUser({
        id: OBR.player.id,
        name: res[0],
        color: res[1],
        role: res[2]
      });
    }).catch(err => console.log('ERROR at fetching userData', err));
  }

  //* Room & UserData
  useEffect(() => {
    OBR.onReady(() => {
      setLoading(true);
      
      setRoomId(OBR.room.id)
      updatePlayerData();
      OBR.player.onChange(() => {
        updatePlayerData();
      });

      setLoading(false);
    });

  }, [ready]);


  //TODO test backend and synchronization
  const [counter, setCounter] = useState(0);

  const updateCounter = (value: number) => {
    setCounter(value);
    
  }

  return {
    loading,
    roomId,
    user,

    counter,
    setCounter
  }
}
