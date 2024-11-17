import React, { useContext, useEffect, useRef, useState } from 'react';
import Input from '@mui/joy/Input';
import {IDataContext, DataContext} from '../../context/DataContext';
import { generateChatMsg } from '../../utility/objTemplates';
import { ICharacter } from '../../interfaces/character';
import { Button } from '@mui/joy';
import Badge from '@mui/joy/Badge';
import Autocomplete from '@mui/joy/Autocomplete';
import Textarea from '@mui/joy/Textarea';
import d4 from '../../assets/img/d4.png'
import d6 from '../../assets/img/d6.png'
import d8 from '../../assets/img/d8.png'
import d10 from '../../assets/img/d10.png'
import d12 from '../../assets/img/d12.png'
import d20 from '../../assets/img/d20.png'
import './ChatInput.css';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { isValidDiceRoll } from '../../utility/dice';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export interface ChatInputProps {
    availableCharas: ICharacter[],
    character?: ICharacter,
    setCharacter: (value: ICharacter | undefined) => void
}

export const ChatInput = ({availableCharas, character, setCharacter}: ChatInputProps) => {
    const { loading, dataManagement, broadcast } = useContext<IDataContext>(DataContext);
    const [message, setMessage] = useState<string>('');
    const [whisper, setWhisper] = useState(false);
    
    const [d4num, setD4num] = useState<number>(0);
    const [d6num, setD6num] = useState<number>(0);
    const [d8num, setD8num] = useState<number>(0);
    const [d10num, setD10num] = useState<number>(0);
    const [d12num, setD12num] = useState<number>(0);
    const [d20num, setD20num] = useState<number>(0);
    const [dInput, setDInput] = useState<string>('');

    const url = useRef<string>(import.meta.env.VITE_API_URL);
    const diceTimer = useRef<NodeJS.Timeout>();

    const sendMessage = (e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>, roll?: string) => {
        if(loading || !dataManagement || !dataManagement.user || !character || !character.id) return;

        if(e) e.stopPropagation();
        
        const text = message.trim() == '' ? 'Lanza dados' : message;
        const campaign = dataManagement.roomId;
        const userId = dataManagement.user.id;
        const charaId = character.id;
        const msg = generateChatMsg(userId, charaId, text, whisper, roll);
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

    const sendRoll = (strRoll: string, amount?: number) => {
        if(!isValidDiceRoll(strRoll)) return;

        const diceRoll = new DiceRoll(amount ? (amount + strRoll) : strRoll);
        sendMessage(undefined, diceRoll.output);
    };

    const keyPressHandler = (e: any) => {
        if(!e || !e.key || e.key != 'Enter' || e.shiftKey) return;
        sendMessage();
    }

    const clearDiceCounters = () => {
        setD4num(0);
        setD6num(0);
        setD8num(0);
        setD10num(0);
        setD12num(0);
        setD20num(0);
    };

    const addDice = (dice: string) => {
        console.log('dice', dice)
        let amount = 1;
        switch (dice) {
            case 'd4':
                amount = d4num + 1;
                setD4num(d4num + 1);
                break;
            case 'd6':
                amount = d6num + 1;
                setD6num(d6num + 1);
                break;
            case 'd8':
                amount = d8num + 1;
                setD8num(d8num + 1);
                break;
            case 'd10':
                amount = d10num + 1;
                setD10num(d10num + 1);
                break;
            case 'd12':
                amount = d12num + 1;
                setD12num(d12num + 1);
                break;
            case 'd20':
                amount = d20num + 1;
                setD20num(d20num + 1);
                break;
        
            default:
                return;
        }

        if(diceTimer.current) {
            clearTimeout(diceTimer.current)
        }

        diceTimer.current = setTimeout(() => {
            sendRoll(dice, amount)
            clearDiceCounters();
        }, 250);
    }

    const dInputKeyUp = (event: any) => {
        if(event.key != 'Enter') return;
        
        console.log(dInput);
        sendRoll(dInput); 
        setDInput('');
    }

    return (
        <div className="chatInputContainer">
            <div className="headerContainer">
                {/* <Autocomplete
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
                /> */}
                <Select
                    size={'sm'}
                    disabled={
                        loading || !dataManagement || !dataManagement.characters
                        || !dataManagement.user
                    }
                    onChange={(e, chara) => chara ? setCharacter(chara) : setCharacter(undefined)}
                    defaultValue={character}
                    placeholder='Hablar como...'
                    style={{ width: 200}}
                >
                    {
                        availableCharas.map((c, i) => 
                            <Option key={i + '-' + c.name} value={c}>
                                {c.name}
                            </Option>
                        )
                    }
                </Select>

                {/* 
                    //TODO DICES
                */}
                <div className="diceList">
                    <Badge badgeContent={d4num} size={'sm'} badgeInset={'2px 5px 0 0'} variant="solid" >
                        <img className="dice" src={d4} alt="d4" 
                            onClick={() => addDice('d4')}
                        />
                    </Badge>
                    <Badge badgeContent={d6num} size={'sm'} badgeInset={'2px 5px 0 0'} variant="solid" >
                        <img className="dice" src={d6} alt="d6" 
                            onClick={() => addDice('d6')}
                        />
                    </Badge>
                    <Badge badgeContent={d8num} size={'sm'} badgeInset={'2px 5px 0 0'} variant="solid" >
                        <img className="dice" src={d8} alt="d8" 
                            onClick={() => addDice('d8')}
                        />
                    </Badge>
                    <Badge badgeContent={d10num} size={'sm'} badgeInset={'2px 5px 0 0'} variant="solid" >
                        <img className="dice" src={d10} alt="d10" 
                            onClick={() => addDice('d10')}
                        />
                    </Badge>
                    <Badge badgeContent={d12num} size={'sm'} badgeInset={'2px 5px 0 0'} variant="solid" >
                        <img className="dice" src={d12} alt="d12" 
                            onClick={() => addDice('d12')}
                        />
                    </Badge>
                    <Badge badgeContent={d20num} size={'sm'} badgeInset={'2px 5px 0 0'} variant="solid" >
                        <img className="dice" src={d20} alt="d20" 
                            onClick={() => addDice('d20')}
                        />
                    </Badge>
                    <Input className="diceInput"
                        placeholder="Dados"
                        variant="plain"
                        size={'sm'}
                        value={dInput}
                        onFocus={() => clearDiceCounters()}
                        onChange={(e) => setDInput(e.target.value)}
                        onKeyUp={dInputKeyUp}
                        style={{
                            borderBottom: 'solid 1px rgba(100, 100, 100, 0.4)',
                            borderRadius: 0
                        }}
                    />
                </div>
            </div>

            <div className="inputContainer">
                <Textarea
                    placeholder="Escribir mensaje..."
                    variant={'outlined'}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    onKeyUp={keyPressHandler}
                    minRows={2}
                    maxRows={2}
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
                    className='chatSendButton'
                >
                    Enviar
                </Button>
            </div>
        </div>

    )
}
