import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";

export class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async register(req: Request, res: Response): Promise<any> {
        try {
            const payload = req.body;
            const hashedPassword = await bcrypt.hash(payload.password, 10);
            const user = await this.userService.createUser({ ...payload, password: hashedPassword });

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: user
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async login(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;
            const user = await this.userService.getUserParams({ email });

            if (!user) throw new Error("Invalid credentials");

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) throw new Error("Invalid credentials");

            const token = jwt.sign(
                { id: user.id, name: user.name },
                process.env.JWT_SECRET as string,
                { expiresIn: "2h" }
            );

            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: { token, user },
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}
