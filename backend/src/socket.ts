import { Server, Socket } from "socket.io";

export const setupSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("New client connected:", socket.id);

        socket.on("welcome", () => {
            socket.emit("welcome", { message: "Hello from the server!", socketId: socket.id });
        });

        socket.on("join", () => {
            io.emit("join");
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};