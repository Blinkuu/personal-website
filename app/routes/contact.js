const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const request = require("request");

/* GET contact page. */
router.get("/", (req, res) => {
  res.render("contact");
});

router.post("/", (req, res) => {
  const [name, email, subject, message, recaptcha] = [
    req.body.name,
    req.body.email,
    req.body.subject,
    req.body.message,
    req.body["g-recaptcha-response"]
  ];

  request.post(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      form: {
        secret: process.env.RECAPTCHA_SECRET,
        response: recaptcha
      }
    },
    (err, httpResponse, body) => {
      const parsedBody = JSON.parse(body);

      if (parsedBody.success === true) {
        sendMail(res, name, email, subject, message);
      } else {
        res.render("error", {
          message: "Failed to bypass reCAPTCHA!",
          error: ""
        });
      }
    }
  );
});

const sendMail = (res, name, email, subject, message) => {
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
    subject: subject,
    text: `${name} (${email}) says: ${message}`
  };

  smtpTransport.sendMail(mailOptions, error => {
    if (error) {
      res.render("error", {
        message: "Failed to send an email!",
        error: error
      });
    } else {
      res.redirect("/");
    }
  });
};

module.exports = router;
