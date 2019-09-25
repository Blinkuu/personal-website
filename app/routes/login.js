const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

/* GET login page. */
router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, err => {
    if (!err) {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/admin");
      });
    } else {
      console.log(err);
      res.redirect("/login");
    }
  });
});

module.exports = router;
