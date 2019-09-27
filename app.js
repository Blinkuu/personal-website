require('dotenv').config()
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');

const session = require("express-session");
const passport = require("passport");

const homeRouter = require("./app/routes/home");
const projectsRouter = require("./app/routes/projects");
const aboutRouter = require("./app/routes/about");
const contactRouter = require("./app/routes/contact");
const loginRouter = require("./app/routes/login");
const logoutRouter = require("./app/routes/logout");
const adminRouter = require("./app/routes/admin");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");

// setup
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// authentication
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", homeRouter);
app.use("/projects", projectsRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
