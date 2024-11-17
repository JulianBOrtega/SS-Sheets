import { ICharacter } from '../interfaces/character';
import { IChatMsg } from '../interfaces/chat';
import { SuccessLevel } from './dice';

export const getDefaultCharacter = (userId: string): ICharacter => ({
    id: null,
    userId: userId,
    name: 'Introducir nombre',
    race: '',
    classId: 1,
    level: 1,
    exp: 0,
    hp: 16,
    damageDice: '1d4',
    tempArmor: 0,
    alignment: 'neutral',
    stats: {
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10
    },
    inventory: [],
    bonds: [],
})

export const generateChatMsg = (userId: string, characterId: string, msg: string, isWhisper: boolean, rollResult?: string, successLevel?: SuccessLevel): IChatMsg => ({
    id: null,
    userId,
    characterId: characterId,
    msg,
    rollResult,
    isWhisper,
    successLevel
})