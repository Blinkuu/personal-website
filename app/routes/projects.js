const express = require("express");
const router = express.Router();
const Project = require("../models/project");

/* GET projects page. */
router.get("/", (req, res) => {
  Project.find({}).lean().exec((err, projects) => {
    if (!err) {
      res.render("projects", {projects: projects});  
    } else {
      res.render("error", {
        message: "Failed fetch projects from database!",
        error: err
      });
    }
    
  })
});

module.exports = router;
