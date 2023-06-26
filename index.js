const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.nickname = "Guest";
  io.emit("new connection", "a new user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", socket.nickname + " : " + msg);
  });
  socket.on("disconnect", () => {
    io.emit("disconnected", "a user disconnected");
  });
  socket.on("nickname changed", (msg) => {
    socket.nickname = msg;
    io.emit("nickname_change_notif", `Nickname changed to ${msg}`);
  });
  socket.on("typing", () => {
    io.emit("typing", "typing");
  });
});

http.listen(3000, () => {
  console.log(`Socket.io server running at http://localhost:${port}/`);
});
