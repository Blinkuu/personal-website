const express = require("express");
const router = express.Router();
const Post = require("../models/post");

/* GET admin page. */
router.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const posts = await Post.find({}).exec()
    res.render("admin", {posts: posts});
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
