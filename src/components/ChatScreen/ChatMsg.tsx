import React from 'react'
import { IChatMsg } from '../../interfaces/chat'
import { IUser } from '../../interfaces/user'
import './ChatMsg.css'
import { ICharacter } from '../../interfaces/character'
import { getSuccessColor, getSuccessLevel } from '../../utility/dice'

export interface ChatMsgProps {
    chatMsg: IChatMsg,
    brighterBg: boolean,
    characterList?: ICharacter[],
    user?: IUser
}

export const ChatMsg = ({chatMsg, brighterBg, user, characterList}: ChatMsgProps) => {
  return characterList && user && ((!chatMsg.isWhisper) || 
    (chatMsg.isWhisper && user.role == 'GM') 
    || (chatMsg.isWhisper && chatMsg.userId == user.id)) && (
    <>
        {
            !chatMsg.rollResult ? (
                <div className='chatMsg-container chatMsg-msg' style={{background: brighterBg ? 'rgba(45, 45, 45, 1)' : 'rgba(30, 30, 30, 1)'}}>
                    <p className='chatMsg-character' style={{color: chatMsg.isWhisper ? 'palevioletred' : undefined}}>
                        {
                            characterList.find(
                                c => c.id == chatMsg.characterId
                            )?.name || 'Desconocido (PJ Eliminado?)'
                        }
                        {
                                chatMsg.isWhisper && ' (Sussuro a DM)'
                        }
                    </p>
                    <p className='chatMsg-msgChat' style={{color: chatMsg.isWhisper ? 'palevioletred' : undefined}}>
                        {chatMsg.msg}
                    </p>
                </div>
            ) : (
                <div style={{
                    paddingTop: 1,
                    paddingBottom: 1,
                    paddingLeft: 50, 
                    paddingRight: 50
                    }}>
                    <div className='chatMsg-container chatMsg-roll'>
                        <p className='chatMsg-character' style={{color: chatMsg.isWhisper ? 'pink' : undefined}}>
                            {
                                characterList.find(
                                    c => c.id == chatMsg.characterId
                                )?.name || 'Desconocido (PJ Eliminado?)'
                            }

                            {
                                chatMsg.isWhisper && '(Sussuro a DM)'
                            }
                        </p>
                        <p className='chatMsg-msgChat chatMsg-msgRoll'>
                            {chatMsg.msg}
                        </p>
                        <div className='chatMsg-rollResultContainer'>
                            <div className='chatMsg-rollResultCard'>
                                <p className='chatMsg-rollResultFull'>
                                    {chatMsg.rollResult}
                                </p>
                                <p className='chatMsg-rollResultSummary' style={{
                                    color: getSuccessColor(chatMsg.rollResult)
                                }}>
                                    {
                                        !chatMsg.msg.includes('daño') && getSuccessLevel(chatMsg.rollResult)
                                    } 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }   
    </>
  )
}
