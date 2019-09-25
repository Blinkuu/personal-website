const express = require("express");
const router = express.Router();
const Information = require("../models/information");

/* GET home page. */
router.get("/", (req, res) => {
  Information.findOne({}, (err, information) => {
    if (!err) {
      res.render("about", {information: information});
    } else {
      res.render("error", {
        message: "Failed fetch about information from database!",
        error: err
      });
    }
  })
});

module.exports = router;
