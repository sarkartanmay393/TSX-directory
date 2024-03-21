const { createServer } = require("http");
const socketIo = require("socket.io");
const express = require("./node_modules/express");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + "/public"));
app.use(cors());

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("offer", (offer) => {
    console.log("offer");
    socket.to(offer.to).emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    console.log("answer");
    socket.to(answer.to).emit("answer", answer);
  });

  socket.on("candidate", (candidate) => {
    console.log("candidate");
    socket.to(candidate.to).emit("candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
