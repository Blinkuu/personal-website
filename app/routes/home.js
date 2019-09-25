const express = require("express");
const router = express.Router();
const Post = require("../models/posts");

/* GET home page. */
router.get("/", (req, res) => {
  Post.find({}).lean().exec((err, posts) => {
    if (!err) {
      posts.forEach((post) => {
        post.date = new Date(post.date).toUTCString();
      });
      res.render("home", { posts: posts });
    } else {
      res.render("error", {
        message: "Failed fetch posts from database!",
        error: err
      });
    }
  });
});

/* GET home page. */
router.get("/home", (req, res) => {
  res.redirect("/");
});

module.exports = router;
