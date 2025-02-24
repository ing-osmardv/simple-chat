import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import "./data-source";

import authRouter from "./routes/auth.router";
import messageRouter from "./routes/auth.router";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SIMPLE CHAT API is running...");
});

app.use("/auth", authRouter);
app.use("/message", messageRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
