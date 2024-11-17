import { ICharacter } from "../interfaces/character";
import { getClass } from "./hardcoded";

export const getStatModifier = (rawStat: number) => {
    return rawStat >= 22 ? 5
        : rawStat >= 20 ? 4
        : rawStat >= 18 ? 3
        : rawStat >= 16 ? 2
        : rawStat >= 13 ? 1
        : rawStat >= 10 ? 0
        : -1;
}

export const getMaxExp = (currentLevel: number) => {
    return currentLevel + 7;
}

export const getMaxHp = (character: ICharacter) => {
    const charaClass = getClass(character.classId);
    
    if(!character) {
        console.log('character is null. Assigning maxHp of 6');
        return 6;
    } else if(!charaClass) {
        console.log('Character class with id', character.classId, 'not found. Assigning maxHp of 6 + constitution');
        return 6 + character.stats.con;
    }

    return charaClass.baseHP + character.stats.con;
}