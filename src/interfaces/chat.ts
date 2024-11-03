export interface IChatMsg{
    userId: number,
    characterId: number,
    msg: string,
    rollResult?: string,
    isWhisper: boolean
}