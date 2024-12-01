import React, { useRef } from 'react'
import { IChatMsg } from '../../interfaces/chat'
import { IUser } from '../../interfaces/user'
import './ChatMsg.css'
import { ICharacter } from '../../interfaces/character'
import { getSuccessColor, getSuccessLabel, getSuccessLevel } from '../../utility/dice'
import { replaceAll } from '../../utility/stringUtilities';
import defaultImg from '../../assets/img/no-chara-img.png'

export interface ChatMsgProps {
    chatMsg: IChatMsg,
    brighterBg: boolean,
    characterList?: ICharacter[],
    user?: IUser
}

export const ChatMsg = ({ chatMsg, brighterBg, user, characterList }: ChatMsgProps) => {
    const character = useRef<ICharacter | undefined>(
        characterList?.find(c => c.id == chatMsg.characterId)
    );
    return characterList && user && ((!chatMsg.isWhisper) ||
        (chatMsg.isWhisper && user.role == 'GM')
        || (chatMsg.isWhisper && chatMsg.userId == user.id)) && (
            <>
                {!chatMsg.rollResult ? (
                    <div className='chatMsg-container chatMsg-msg' style={{ background: brighterBg ? 'rgba(45, 45, 45, 0.75)' : 'rgba(30, 30, 30, 0.75)' }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                            { chatMsg.characterId != 'DM' &&
                                <img src={
                                    character.current?.imgPath ? 
                                    character.current.imgPath : defaultImg
                                    } 
                                    alt="character-img"
                                    style={{height: 50, width: 50, borderRadius: 100}}
                                />
                            }
                            <div>
                                <p className='chatMsg-character' style={{ 
                                    color: chatMsg.isWhisper ? 'palevioletred' : chatMsg.characterId == 'DM' ? 'DarkOrchid' : undefined,

                                }}>
                                    {
                                        character.current?.name ? character.current.name : chatMsg.characterId == 'DM' ? 'DM' : 'Desconocido (PJ Eliminado?)'
                                    }
                                    {
                                        chatMsg.isWhisper && ' (Sussuro a DM)'
                                    }
                                </p>
                                <p className='chatMsg-msgChat' style={{ color: chatMsg.isWhisper ? 'palevioletred' : undefined }}>
                                    {chatMsg.msg}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{
                        paddingTop: 1,
                        paddingBottom: 1,
                        paddingLeft: 50,
                        paddingRight: 50
                    }}>
                        <div className='chatMsg-roll'>
                            <div>
                                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                    { chatMsg.characterId != 'DM' &&
                                        <img src={
                                            character.current?.imgPath ? 
                                            character.current.imgPath : defaultImg
                                            } 
                                            alt="character-img"
                                            style={{height: 50, width: 50, borderRadius: 100}}
                                        />
                                    }
                                    <div>
                                        <div className='chatMsg-character' style={{ 
                                            color: chatMsg.isWhisper ? 'palevioletred' : chatMsg.characterId == 'DM' ? 'DarkOrchid' : undefined
                                        }}>
                                            {
                                                character.current?.name ? character.current.name : chatMsg.characterId == 'DM' ? 'DM' : 'Desconocido (PJ Eliminado?)'
                                            }

                                            {
                                                chatMsg.isWhisper && ' (Sussuro a DM)'
                                            }
                                        </div>
                                        <p className='chatMsg-msgChat chatMsg-msgRoll' style={{
                                            color: chatMsg.isWhisper ? 'palevioletred' : chatMsg.characterId == 'DM' ? 'DarkOrchid' : undefined
                                        }}>
                                            {chatMsg.msg}
                                        </p>
                                    </div>
                                </div>
                                <div className='chatMsg-rollResultContainer'>
                                    <div className='chatMsg-rollResultCard'>
                                        <p className='chatMsg-rollResultCalc'>
                                            {
                                                replaceAll(chatMsg.rollResult.slice(
                                                    0,
                                                    chatMsg.rollResult.lastIndexOf('=')
                                                ), '+-', '-')
                                            }
                                        </p>

                                        <p className='chatMsg-rollResultTotal'>
                                            {
                                                chatMsg.rollResult.slice(
                                                    chatMsg.rollResult.lastIndexOf('=')
                                                )
                                            }
                                        </p>

                                        {chatMsg.successLevel && (
                                            <p className='chatMsg-rollResultSummary' style={{
                                                color: getSuccessColor(chatMsg.successLevel)
                                            }}>
                                                {
                                                    getSuccessLabel(chatMsg.successLevel)
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
}
