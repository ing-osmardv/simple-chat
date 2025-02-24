import { Request, Response } from "express";
import { MessageService } from "../services/message.service";
import jwt from 'jsonwebtoken';
import { IUser } from "../interfaces/user.interfaces";

export class MessageController {
    private messageService: MessageService;

    constructor() {
        this.messageService = new MessageService();
    }

    async addMessage(req: Request, res: Response): Promise<any> {
        try {
            const { receiver, text } = req.body;
            if (!receiver || !text) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Token no proporcionado' });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;

            const newMessage = await this.messageService.addMessage({ sender: decoded.id, receiver, text });
            return res.status(201).json(newMessage);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    async getUserMessages(req: Request, res: Response): Promise<any> {
        try {
            const parnterId = req.params.id;
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Token no proporcionado' });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;
            if (!decoded.id || !parnterId) {
                return res.status(400).json({ message: "Invalid sender or receiver ID" });
            }
            const messages = await this.messageService.getUserMessages(decoded.id, parnterId);
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
}
