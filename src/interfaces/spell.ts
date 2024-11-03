export interface ISpell {
    id: number,
    name: string,
    description: string,
    extraDescription: string,
    roll: 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA' | string
}

export interface ISpellList {
    id: number,
    spells: ISpell[]
}