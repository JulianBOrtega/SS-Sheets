import { SuccessLevel } from "../utility/dice"

export interface IChat {
    campaignId: string, 
    chats: IChatMsg[]
}

export interface IChatMsg {
    id: string | null,
    userId: string,
    characterId: string,
    msg: string,
    rollResult?: string,
    successLevel?: SuccessLevel,
    isWhisper: boolean
}