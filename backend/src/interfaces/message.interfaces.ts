export interface IMessage {
    id: string;
    sender: number;
    receiver: number;
    text: string;
    created_at: Date;
}

export interface ICreateMessage {
    sender: number;
    receiver: number;
    text: string;
}