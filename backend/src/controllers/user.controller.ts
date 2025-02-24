import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserService } from "../services/user.service";
import { IUser } from "../interfaces/user.interfaces";


export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getUsersRegistered(req: Request, res: Response): Promise<any> {

        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Token no proporcionado' });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;
            const users = await this.userService.getUsersExceptId(decoded.id);
            return res.status(201).json(users);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    async status(req: Request, res: Response): Promise<any> {
        try {
            const { is_connected, socket_id } = req.body;
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Token no proporcionado' });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;
            const user = await this.userService.updateUser(decoded.id, { is_connected, socket_id });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
}
