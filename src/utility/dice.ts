import { DiceRoll } from "@dice-roller/rpg-dice-roller";

//? -F = Fallo crítico
//? F = Fallo
//? N = Exito parcial
//? E = Exito
//? E = Exito crítico
export type SuccessLevel = '-F' | 'F' | 'N' | 'E' | '+E';

export const getSuccessLevel = (roll: DiceRoll): SuccessLevel => {
    const total = roll.total;
    const mod = roll.rolls[2];

    if(total > 18) return '+E';
    else if (total > 15) return 'E';
    else if (total > 9) return 'N';
    else if (total > 2) return 'F';
    else return '-F';
}

export const getSuccessColor = (successLevel: SuccessLevel) => {
    if(successLevel == '+E') return 'orange';
    else if (successLevel == 'E') return 'green';
    else if (successLevel == 'N') return 'white';
    else if (successLevel == 'F') return 'gray';
    else return 'red'
}

export const getSuccessLabel = (successLevel: SuccessLevel) => {
    if(successLevel == '+E') return 'Éxito crítico!';
    else if (successLevel == 'E') return 'Éxito';
    else if (successLevel == 'N') return 'Éxito parcial';
    else if (successLevel == 'F') return 'Fallo';
    else return 'Fallo crítico!'
}

export const isValidDiceRoll = (dices: string) => {
    if(!dices || dices.trim() == '' || dices.trim().length < 0) return false;

    const sanitized = dices.trim().toLowerCase()
        .replace(/[^d0-9+\-*/x\s]/g, '')   // Remove invalid characters
        .replace(/\s+/g, ' ');             // Normalize spaces
    
    if(sanitized === '') return false; 

    const diceRegex = /^((?:[+-]?[1-9]\d*)?[dD][1-9]\d*(?:[+\-*x/][1-9]\d*)?)+$/;
    
    return diceRegex.test(sanitized);
}