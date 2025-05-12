import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5174", "https://0jc2qnnc-5174.usw3.devtunnels.ms"]
  }
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// object for online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  
  
  const userId = socket.handshake.query.userId;
  socket.join(userId);
  
  if (userId) userSocketMap[userId] = socket.id;
  console.log(Object.keys(userSocketMap).length + " users connected.")
  
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    console.log(Object.keys(userSocketMap).length + " users connected.");

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
