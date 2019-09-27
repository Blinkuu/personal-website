const express = require("express");
const router = express.Router();
const Post = require("../models/post");

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

router.get("/home", (req, res) => {
  res.redirect("/");
});

router.post("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const newPost = new Post({ author: req.body.author, date: Date.now(), title: req.body.title, content: req.body.content });
    const result = await newPost.save();
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

router.delete("/:postId", async (req, res) => {
  if (req.isAuthenticated()) {
    console.log("PARAMID: " + req.params.postId);
    const result = await Post.deleteOne({ _id: req.params.postId }).exec();
    res.redirect(303, "/admin");
  } else {
    res.redirect(303, "/");
  }
})

module.exports = router;
