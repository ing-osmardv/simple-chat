import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getUsers(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.user;
            const newMessage = await this.userService.addMessage({ sender, receiver, text });
            return res.status(201).json(newMessage);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
}
