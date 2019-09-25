const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
        type: String,
        required: true
      }
  });
  
const Post = mongoose.model("Post", postSchema);

module.exports = Post;