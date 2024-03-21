import { WebSocket } from "ws";

let counter = 0;
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("error", (error) => {
    console.error(error);
  });

  ws.on("message", (data) => {
    // console.log("received from client: %s", data);
    // ws.send();
    wss.clients.forEach((clientSocket) => {
      if (clientSocket !== ws) {
        clientSocket.send(`${data} ${++counter}`);
      }
    });
  });

  ws.on("close", (code, reason) => {
    console.log(reason, code);
  });

  ws.send("Hi from server! 0");
});

console.log("WebSocket server started on ws://localhost:8080");
