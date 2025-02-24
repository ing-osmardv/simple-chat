import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["src/entities/*.ts"],
    synchronize: true,
    logging: false,
});

AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("Database connection error:", error));
