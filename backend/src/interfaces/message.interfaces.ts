export interface IMessage {
    id: string;
    sender: string;
    receiver: string;
    text: string;
    created_at: Date;
}

export interface ICreateMessage {
    sender: string;
    receiver: string;
    text: string;
}