const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Serve room.html when accessing the '/room' URL
app.get('/room', (req, res) => {
  res.sendFile(__dirname + '/public/room.html');
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // When a user sends an offer to join the room
  socket.on("offer", (offer, roomId) => {
    socket.to(roomId).emit("offer", offer);
  });

  // When a user sends an answer to the offer
  socket.on("answer", (answer, roomId) => {
    socket.to(roomId).emit("answer", answer);
  });

  // When a user sends an ICE candidate to another user
  socket.on("candidate", (candidate, roomId) => {
    socket.to(roomId).emit("candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
