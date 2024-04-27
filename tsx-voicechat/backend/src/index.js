const { createServer } = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const express = require("express");

const PORT = process.env.PORT || 8080;
const app = express();
const server = createServer(app);
const io = socketIo(server, {
  cors: {},
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("offer", (data) => {
    console.log("Offer\n");
    socket.join(data.roomId);
    if (data.offer) {
      socket
        .to(data.roomId)
        .emit("offer", { offer: data.offer, senderId: socket.id });
    }
  });

  socket.on("answer", (data) => {
    console.log("Answer", data);
    if (data.answer) {
      socket
        .to(data.roomId)
        .emit("answer", { answer: data.answer, senderId: socket.id });
    }
  });

  socket.on("ice-candidate", (data) => {
    console.log("ICE-Candidate\n");
    if (data.candidate) {
      socket.to(data.roomId).emit("ice-candidate", {
        candidate: data.candidate,
        senderId: socket.id,
      });
    }
  });

  socket.on("join", (data) => {
    socket.join(data.roomId);
    console.log(`User ${socket.id} joined room ${data.roomId}`);
    socket
      .to(data.roomId)
      .emit("join", { roomId: data.roomId, userId: socket.id });
  });

  socket.on("disconnect", (reason) => {
    console.log("User disconnected", socket.id, "Reason:", reason);
    // Notify other users in the same room
    socket.broadcast.emit("userDisconnected", { userId: socket.id, reason });
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
