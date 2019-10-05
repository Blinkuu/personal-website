const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", (req, res) => {
  Post.find({})
    .lean()
    .exec((err, posts) => {
      if (!err) {
        posts.forEach(post => {
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

router.get("/:postId", (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .lean()
    .exec((err, post) => {
      if (!err) {
        post.date = new Date(post.date).toUTCString();
        res.render("post", { post: post });
      } else {
        res.render("error", {
          message: "Failed fetch post from database!",
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
    const newPost = new Post({
      author: req.body.author,
      date: Date.now(),
      title: req.body.title,
      introduction: req.body.introduction,
      content: req.body.content
    });
    const result = await newPost.save();
    res.redirect("/admin");
  } else {
    res.redirect("/");
  }
});

router.delete("/:postId", async (req, res) => {
  if (req.isAuthenticated()) {
    const result = await Post.deleteOne({ _id: req.params.postId }).exec();
    res.redirect(303, "/admin");
  } else {
    res.redirect(303, "/");
  }
});

router.put("/:postId", async (req, res) => {
  if (req.isAuthenticated()) {
    const result = await Post.updateOne(
      { _id: req.params.postId },
      {
        author: req.body.data.author,
        date: Date.now(),
        title: req.body.data.title,
        introduction: req.body.data.introduction,
        content: req.body.data.content
      }
    ).exec();
    res.redirect(303, "/admin");
  } else {
    res.redirect(303, "/");
  }
});

router.get("/edit/:postId", async (req, res) => {
  console.log(req.params.postId);
  if (req.isAuthenticated()) {
    const result = await Post.findById(req.params.postId).exec();
    res.send(result);
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
