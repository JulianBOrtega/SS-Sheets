import { ICharacter } from '../interfaces/character';
import { IChatMsg } from '../interfaces/chat';

export const getDefaultCharacter = (userId: string): ICharacter => ({
    id: null,
    userId: userId,
    name: 'Introducir nombre',
    race: 'Raza',
    classId: 'noClass',
    level: 1,
    exp: 0,
    hp: 6,
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

export const generateChatMsg = (userId: string, characterId: string, msg: string, isWhisper: boolean, rollResult?: string): IChatMsg => ({
    id: null,
    userId,
    characterId: characterId,
    msg,
    rollResult,
    isWhisper
})