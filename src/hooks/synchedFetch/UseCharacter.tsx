import { useContext, useEffect, useRef, useState } from "react"
import { DataContext, IDataContext } from "../../context/DataContext";
import { ICharacter } from "../../interfaces/character";

export const UseCharacter = (characterId?: string) => {
    const { loading, dataManagement } = useContext<IDataContext>(DataContext);
    const url = useRef<string>(import.meta.env.VITE_API_URL);
    
    //* States
    const [loadingCharacter, setLoadingCharacter] = useState(true);
    const [character, setCharacter] = useState<ICharacter>();

    const fetching = async (campaignId: string) => {
        console.log('fetching character', characterId);
        setLoadingCharacter(true);

        try {
            const res = await fetch(
                `${url.current}characters/${campaignId}/${characterId}`
            );
            
            const data = await res.json();

            setCharacter(data);
            console.log('success')
        } catch (error) {
            console.log(
                'ERROR at fetching character [' + characterId + 
                '] of campaign [' + campaignId + ']', error
            );
        } finally {
            setLoadingCharacter(false);
            console.log('');
        }
    }

    useEffect(() => {
        if(!characterId || loading || !dataManagement || !dataManagement.roomId) return;
        if(character && character.id != undefined && character.id == characterId) return;

        const campaignId = dataManagement.roomId;
        fetching(campaignId);
    }, [characterId, loading, dataManagement]);

    return {
        loading: loadingCharacter,
        character,
    }
}