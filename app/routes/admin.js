const express = require("express");
const router = express.Router();

/* GET admin page. */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("admin");  
  } else {
    res.redirect("/");
  }
});

module.exports = router;
