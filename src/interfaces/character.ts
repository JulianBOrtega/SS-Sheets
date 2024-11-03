export interface ICharacter {
    id: number,
    userId: number,
    name: string,
    race: string,
    classId: number,
    level: number,
    exp: number,
    hp: number,
    damageDice: string,
    alignment: string,
    stats: IStats,
    inventory: ICharacterItem[],
    bonds: IBond[],
    imgPath?: string,

    //? Not saved in json
    getArmor: () => number,
    getMaxHp: () => number,
    getMaxExp: () => number,
    getMaxWeight: () => number,

}

export interface IStats {
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
    
    //? Not saved in json
    getStatMod: (stat: 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA') => number,
}

export interface ICharacterItem {
    itemId: 0,
    equipped: boolean,
    amount: number,
}

export interface IBond {
    characterId: number,
    bond: number,
    notes: string
}