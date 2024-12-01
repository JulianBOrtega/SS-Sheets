import OBR from "@owlbear-rodeo/sdk";
import { createContext, useEffect, useState } from "react";
import { IDataManagement, UseDataManagement } from "../hooks/UseDataManagement";
import { ICharacter } from "../interfaces/character";

type updatableData = 'characters' | 'chats';
const updateChannel = 'ss.update'
export interface IDataContext {
    loading: boolean
    dataManagement?: IDataManagement,
    speakingAs?: ICharacter | null,
    broadcast: {
        update: (target: updatableData) => void
    },
    setSpeakingAs: (character: ICharacter | null) => void
}

export interface IUpdateBroadcast {
    target: updatableData,
    timestamp: string
}

export const DataContext = createContext<IDataContext>({
    loading: true,
    setSpeakingAs: (character: ICharacter | null) => {},
    broadcast: {
        update: (target: updatableData) => {}
    },
});

const DataProvider = ({children}: any) => {
    const [loading, setLoading] = useState(true);
    const [speakingAs, setSpeakingAs] = useState<ICharacter | null>();
    const dataManagement = UseDataManagement(loading);
    
    const broadcastUpdate = (target: updatableData) => {
        if(!OBR.isReady) return;
        
        const d = new Date();
        const payload = {
            target,
            timestamp: `${d.getDay()}/${d.getMonth()+1}/${d.getFullYear()}`
        };

        //? Sent to other players
        OBR.broadcast.sendMessage(
            updateChannel, payload, {destination: 'REMOTE'}
        );
        //? Sent to self
        OBR.broadcast.sendMessage(
            updateChannel, payload, {destination: 'LOCAL'}
        );

        console.log('update sent (' + updateChannel + ')', payload);
    };


    useEffect(() => {
        OBR.onReady(() => {
            setLoading(false);

            //* onUpdate broadcast signal
            OBR.broadcast.onMessage(updateChannel, msg => {
                console.log('Update msg received', msg);
                const payload = msg.data as IUpdateBroadcast;
                
                switch (payload.target) {
                    case 'characters':
                        dataManagement.refetch.characters()
                        break;
                    case 'chats':
                        dataManagement.refetch.chats()
                        break;
                    default:
                        break;
                }
            });
        });
    }, []);


    return (
        <DataContext.Provider value={{
            loading,
            dataManagement,
            speakingAs,
            setSpeakingAs,
            broadcast: { 
                update: broadcastUpdate 
            }
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;