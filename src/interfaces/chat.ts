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
    isWhisper: boolean
}