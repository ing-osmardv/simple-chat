import { Request, Response } from "express";
import { MessageService } from "../services/message.service";

export class MessageController {
    private messageService: MessageService;

    constructor() {
        this.messageService = new MessageService();
    }

    async addMessage(req: Request, res: Response): Promise<any> {
        try {
            const { sender, receiver, text } = req.body;
            if (!sender || !receiver || !text) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const newMessage = await this.messageService.addMessage({ sender, receiver, text });
            return res.status(201).json(newMessage);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    async getUserMessages(req: Request, res: Response): Promise<any> {
        try {
            const sender = parseInt(req.params.sender);
            const receiver = parseInt(req.params.receiver);

            if (isNaN(sender) || isNaN(receiver)) {
                return res.status(400).json({ message: "Invalid sender or receiver ID" });
            }

            const messages = await this.messageService.getUserMessages(sender, receiver);
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
}
