export interface IUser {
    id: string;
    email: string;
    username: string;
    name: string;
    password: string;
    is_connected: boolean;
    socket_id: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface ICreateUser {
    email: string;
    username: string;
    name: string;
    password: string;
}

export interface IUpdateUser {
    email: string;
    username: string;
    name: string;
    password: string;
    is_connected: boolean;
    socket_id: string | null;
}