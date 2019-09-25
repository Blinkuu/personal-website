const express = require("express");
const router = express.Router();

/* Deauthenticate user */
router.get("/", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;