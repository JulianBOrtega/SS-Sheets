export interface ICampaignCharacters {
    campaignId: string,
    characters: ICharacter[]
}

export interface ICharacter {
    id: string | null,
    userId: string,
    name: string,
    race: string,
    classId: string,
    level: number,
    exp: number,
    hp: number,
    damageDice: string,
    alignment: string,
    stats: IStats,
    inventory: ICharacterItem[],
    bonds: IBond[],
    tempArmor: number,
    imgPath?: string,

    //? Move to Utility file
    /* getArmor: () => number,
    getMaxHp: () => number,
    getMaxExp: () => number,
    getMaxWeight: () => number, */

}

export interface IStats {
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
    
    //? Move to Utility file
    /* getStatMod: (stat: 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA') => number, */
}

export interface ICharacterItem {
    itemId: string,
    equipped: boolean,
    amount: number,
}

export interface IBond {
    id: string,
    characterId: string,
    bond: number,
    notes: string
}