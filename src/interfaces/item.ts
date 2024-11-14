export interface IItem {
    id: string,
    name: string,
    description: string,
    equippable: boolean,
    consumable: boolean,
    stackable: false | number,
    buyPrice: number,
    sellPrice: number,
    weight: number,
    imgPath?: string,
}