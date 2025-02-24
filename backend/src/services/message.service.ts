import { AppDataSource } from "../data-source";
import { Message } from "../entities/Message.entitiy";
import { ICreateMessage, IMessage } from "../interfaces/message.interfaces";

export class MessageService {
    private messageRepository;

    constructor() {
        this.messageRepository = AppDataSource.getRepository(Message);
    }

    async addMessage(payload: ICreateMessage): Promise<IMessage> {
        console.info(payload)
        const user = this.messageRepository.create(payload);
        return await this.messageRepository.save(user);
    }

    async getUserMessages(me: string, partner: string): Promise<IMessage[]> {

        const messages = await this.messageRepository.find({
            where: [
                { sender: { id: me }, receiver: { id: partner } },
                { sender: { id: partner }, receiver: { id: me } }
            ],
            relations: ['sender', 'receiver'],
            order: { created_at: 'ASC' }
        });
    
        return messages.map(msg => ({
            ...msg,
            isMine: msg.sender.id === me 
        }));
    }
}