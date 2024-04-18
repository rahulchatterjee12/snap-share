import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for socket events
  },
};

const io = new Server();

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("comment-update", (data) => {});

  socket.on("like-update", (data) => {
    console.log("liked");
  });
});

export default function SocketHandler(req, res) {
  if (!res.socket.server.io) {
    // Attach the Socket.io server to the Next.js server
    res.socket.server.io = io;
  }
  res.end();
}
