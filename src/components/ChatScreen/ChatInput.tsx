import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import {IDataContext, DataContext} from '../../context/DataContext';
import './ChatInput.css';
import { generateChatMsg } from '../../utility/objTemplates';
import { ICharacter } from '../../interfaces/character';
import Autocomplete from '@mui/joy/Autocomplete';

export interface ChatInputProps {
    availableCharas: ICharacter[],
    character?: ICharacter,
    setCharacter: (value: ICharacter) => void
}

export const ChatInput = ({availableCharas, character, setCharacter}: ChatInputProps) => {
    const { loading, dataManagement, broadcast } = useContext<IDataContext>(DataContext);
    const [message, setMessage] = useState<string>('');
    const [whisper, setWhisper] = useState(false);
    const [roll, setRoll] = useState<string>();
    const url = useRef<string>(import.meta.env.VITE_API_URL);

    const sendMessage = (e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if(loading || !dataManagement || !dataManagement.user || !character || !character.id) return;

        if(e) e.stopPropagation();
        
        const campaign = dataManagement.roomId;
        const userId = dataManagement.user.id;
        const charaId = character.id;
        const msg = generateChatMsg(userId, charaId, message, whisper, roll);
        const fetchOps = {
            method: 'POST', body: JSON.stringify(msg),
            headers: {
                'Content-type': 'application/json'
            }
        };

        fetch(`${url.current}chats/${campaign}`, fetchOps)
        .then(res => res.json()).then(data => broadcast.update('chats'))
        .catch(err => console.log('ERROR at adding new chat', err));

        setMessage('');
    };

    const keyPressHandler = (e: any) => {
        if(!e || !e.key || e.key != 'Enter') return;
        sendMessage();
    }

    return (
        <div className="chatInputContainer">
            <div className="headerContainer">
                {/* 
                    //TODO Change for a selection component 
                */}
                <Autocomplete
                    options={availableCharas}
                    getOptionLabel={option => option.name}
                    loading={
                        loading || !dataManagement || !dataManagement.characters
                        || !dataManagement.user
                    }
                    autoComplete={true}
                    autoSelect={true}
                    disabled={
                        loading || !dataManagement || !dataManagement.characters
                        || !dataManagement.user
                    }
                    disableClearable={true}
                    onChange={(e, chara) => setCharacter(chara)}
                    value={character}
                    placeholder='Hablar como...'
                />

                {/* 
                    //TODO DICES
                */}
                {/* <div className="diceList">
                    <p className="dice">d4</p>
                    <p className="dice">d6</p>
                    <p className="dice">d8</p>
                    <p className="dice">d10</p>
                    <p className="dice">d12</p>
                    <p className="dice">d20</p>
                    <p className="dice">d100</p>
                </div> */}
            </div>

            <div className="inputContainer">
                <Input
                    placeholder="Escribir mensaje..."
                    variant={'outlined'}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    onKeyUp={keyPressHandler}
                />
            </div>

            <div className="sendSection">
                <p 
                    className={whisper ? 'whisperActive' : 'whisperDisabled'}
                    onClick={() => setWhisper(!whisper)}
                >
                    {whisper ? 'Susurrando a DM ♥' : 'Susurrar a DM?'}
                </p>
                
                <Button 
                    variant="solid"
                    onClick={sendMessage}
                    disabled={loading || !dataManagement || !dataManagement.user || !character || !character.id || message.trim().length == 0}
                >
                    Send
                </Button>
            </div>
        </div>

    )
}
