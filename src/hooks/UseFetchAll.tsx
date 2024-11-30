import { useEffect, useRef, useState } from "react";
import { ICampaign } from "../interfaces/campaign";
import { ICampaignCharacters, ICharacter } from "../interfaces/character";
import { IChat, IChatMsg } from "../interfaces/chat";
import chatSFX from '../assets/sounds/chatSFX.mp3'
import { UseSFX } from "./UseSFX";

export const UseFetchAll = (roomId?: string) => {
    const refetchAll = useRef(true);
    const [campaign, setCampaign] = useState<ICampaign>();
    const [characters, setCharacters] = useState<ICharacter[]>();
    const [chats, setChats] = useState<IChatMsg[]>();
    const {playingSFX, toggleSFX} = UseSFX(chatSFX);
    const url = useRef<string>(import.meta.env.VITE_API_URL);
    const roomIdRef = useRef<string>();

    const fetchAll = async (roomId: string) => {
        try {
            console.log('refreshing global data...')
            const reqs = await Promise.all([
                fetch(url.current + `characters/${roomId}`),
                fetch(url.current + `chats/${roomId}`)
            ]);

            const data = await Promise.all([
                reqs[0].json(),
                reqs[1].json(),
            ]);

            setCharacters(data[0]);
            setChats(data[1]);
            
            console.log('characters', data[0]);
            console.log('chats', data[1]);
            console.log('global data refreshed.');
            console.log('');
        } catch (error) {
            console.log('ERROR at fetching SS data', error);
        }
    };

    const fetchCampaign = () => {
        console.log('no campaign endpoints, omitting...')
    };
    
    const fetchCharacters = () => {
        console.log('refetching characters');

        fetch(url.current + `characters/${roomIdRef.current}`)
        .then(req => req.json())
        .then(data => setCharacters(data))
        .catch(err => console.log('ERROR at refetching characters', err));
    };
    
    const fetchChats = () => {
        console.log('refetching chats');

        fetch(url.current + `chats/${roomIdRef.current}`)
        .then(req => req.json())
        .then(data => {setChats(data); toggleSFX();})
        .catch(err => console.log('ERROR at refetching chats', err));
    };

    useEffect(() => {
        if(!refetchAll.current || !roomId) return;
        else refetchAll.current = false;
        
        roomIdRef.current = roomId;
        fetchAll(roomId);
    }, [roomId, refetchAll]);


    return {
        campaign: campaign,
        characters: characters,
        chats: chats,
        refetch: {
            all: () => refetchAll.current = true,
            campaign: fetchCampaign,
            characters: fetchCharacters,
            chats: fetchChats
        }
    }
}