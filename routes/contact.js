const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("contact");
});

router.post("/", (req, res) => {
  console.log(req.body);

  const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const mailOptions = {
    from: "Your sender info here", // This is ignored by Gmail
    to: process.env.GMAIL_USER,
    subject: req.body.subject,
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.render("error", { message: "Failed to send an email!" , error: error}); // Show a page indicating failure
    }
    else {
      res.redirect("/");
    }
  });
});

module.exports = router;
