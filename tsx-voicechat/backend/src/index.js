const { createServer } = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const express = require("express");
require("dotenv").config();

const corsOptions =
  process.env.NODE_ENVIRONMENT === "development"
    ? {}
    : { origin: "https://tsx-vc-backend.onrender.com" };

const PORT = process.env.PORT || 8080;
const app = express();
const server = createServer(app);
const io = socketIo(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));
app.use(express.json());

const roomIds = [];

app.post("/api/checkRoomAvailability", (req, res) => {
  try {
    const { roomId } = req.body;
    const status = roomIds.includes(roomId) ? "unavailable" : "available";
    res.status(200).json({ status });
  } catch (error) {
    res.status(500).json(error);
  }
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("offer", (data) => {
    console.log("Offer\n");
    if (data.offer) {
      socket.to(data.roomId).emit("offer", { offer: data.offer });
    } else {
      console.log("offer not found!");
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
    console.log("ICE-Candidate: ", data.roomId);
    if (data.candidate) {
      socket.to(data.roomId).emit("ice-candidate", {
        candidate: data.candidate,
        senderId: socket.id,
      });
    }
  });

  socket.on("join", (data) => {
    const room = io.sockets.adapter.rooms.get(data.roomId);
    if (room && room.size >= 2) {
      console.log(`Room ${data.roomId} is full. Cannot join.`);
      return;
    }
    socket.join(data.roomId);
    console.log(`User ${socket.id} joined room ${data.roomId}`);
    // socket
    //   .to(data.roomId)
    //   .emit("join", { roomId: data.roomId, userId: socket.id });
  });

  socket.on("disconnect", (reason) => {
    console.log("User disconnected", socket.id, "Reason:", reason);
    // Notify other users in the same room
    // socket.broadcast.emit("userDisconnected", { userId: socket.id, reason });
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
