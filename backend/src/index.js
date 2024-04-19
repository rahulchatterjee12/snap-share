require("dotenv").config();
const app = require("express")();
const PORT = process.env.PORT || 8080;
const dbConnection = require("../src/dbConfig/dbConfig");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

const http = require("http");
const { Server } = require("socket.io");
const Like = require("./models/posts/likeModel");
const Comment = require("./models/posts/commentModel");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json());
app.use(cookieParser());

// Handle CORS Error
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

app.get("/", function (req, res) {
  res.json("working fine");
});

app.use("/api", routes);

dbConnection.then(() => {
  console.log("----Database is connected----");
  app.emit("ready");
});

io.on("connection", (socket) => {
  socket.on("get_likes_count", async (data) => {
    const likes = await Like.countDocuments({ postId: data.postId });
    socket.broadcast.emit("update_like", likes);
  });

  socket.on("get_comment_count", async (data) => {
    const comment_count = await Comment.countDocuments({ postId: data.postId });
    socket.broadcast.emit("update_comment_count", comment_count);
  });
});

server.listen(PORT, () => {
  console.log("Server is running");
});
