import { AppDataSource } from "../data-source";
import { User } from "../entities/User.entity";
import { ICreateUser, IUpdateUser, IUser } from "../interfaces/user.interfaces";

export class UserService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async createUser(payload: ICreateUser): Promise<IUser> {
        const existingUser = await this.userRepository.findOne({
            where: [
                { username: payload.username },
                { email: payload.email }
            ]
        });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const user = this.userRepository.create(payload);
        return await this.userRepository.save(user);
    }

    async getUserById(id: number): Promise<IUser | null> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async getUserParams(payload: Partial<IUser>): Promise<IUser | null> {
        return await this.userRepository.findOne({where: {...payload}})
    }

    async updateUser(id: number, payload: IUpdateUser) {
        const user = await this.userRepository.findOne({
            where: [
                { username: payload.username },
                { email: payload.email }
            ]
        });

        if (user && user.id !== id) {
            throw new Error("User already exists");
        }

        return await this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error("User not found");
        }
        await this.userRepository.remove(user);
    }
}
