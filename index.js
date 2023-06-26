const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log(`Socket.io server running at http://localhost:${port}/`);
});
