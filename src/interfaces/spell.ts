export interface ISpell {
    id: string,
    name: string,
    description: string,
    extraDescription: string,
    roll: 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA' | string
}

export interface ISpellList {
    id: string,
    spells: ISpell[]
}