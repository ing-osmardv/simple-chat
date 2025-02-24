import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import "./data-source";

import authRouter from "./routes/auth.router";
import messageRouter from "./routes/message.router";
import userRouter from "./routes/user.router";
import { setupSocket } from "./socket";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SIMPLE CHAT API is running...");
});

app.use("/auth", authRouter);
app.use("/message", messageRouter);
app.use("/user", userRouter);

setupSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
