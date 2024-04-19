const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: true,
  },
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

module.exports = Post;
