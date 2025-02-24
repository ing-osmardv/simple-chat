import { AppDataSource } from "../data-source";
import { Message } from "../entities/Message.entitiy";
import { ICreateMessage, IMessage } from "../interfaces/message.interfaces";

export class MessageService {
    private messageRepository;

    constructor() {
        this.messageRepository = AppDataSource.getRepository(Message);
    }

    async addMessage(payload: ICreateMessage): Promise<IMessage> {
        const user = this.messageRepository.create(payload);
        return await this.messageRepository.save(user);
    }

    async getUserMessages(sender: number, receiver: number): Promise<IMessage> {
        const messages = await this.messageRepository.find({
            where: { sender, receiver },
        });

        return messages;
    }
}