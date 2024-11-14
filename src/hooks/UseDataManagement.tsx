import OBR from '@owlbear-rodeo/sdk';
import { useState, useEffect, useRef } from 'react';
import { IUser } from '../interfaces/user';
import { ICampaignCharacters, ICharacter } from '../interfaces/character';
import { ICampaign } from '../interfaces/campaign';
import { UseFetchAll } from './UseFetchAll';
import { IChat, IChatMsg } from '../interfaces/chat';

export interface IDataManagement {
  loading: boolean,
  roomId?: string,
  user?: IUser,
  campaign?: ICampaign,
  characters?: ICharacter[],
  chats?: IChatMsg[],
  refetch: {
    all: () => void,
    campaign: () => void,
    characters: () => void,
    chats: () => void,
  }
}

export const UseDataManagement = (ready: boolean): IDataManagement => {
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState<string>();
  const [user, setUser] = useState<IUser>();
  const allData = UseFetchAll(roomId);

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

  return {
    loading,
    roomId,
    user,

    ...allData
  }
}
