require("dotenv").config();

//Mongoose
//when require any library, need create a instance and then use it
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URI, {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    useNewUrlParser: true
  })
  .catch(err => console.error(`ERROR: ${err}`));
//End Mongoosee

// JavaScript Document
const express = require("express");
const path = require("path");

const app = express();

//Adding cookies and sessions support to our app
//Middle ware register
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

app.use(cookieParser());

app.use(
  session({
    secret: process.env.secret || "boorakacha",
    cookie: {
      max: 10800000
    },
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = res.locals.flash || {};
  res.locals.flash.success = req.flash("success") || null;
  res.locals.flash.error = req.flash("error") || null;

  next(); //comtiniue one to the next
});

//Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
//End Parser

//Authenticated helpers
const jwt = require('jsonwebtoken');
const isAuthenticated = (req) => {
  const token = req.cookies.token || req.body.token || req.query.token || req.headers['x-access-token'];

  if (req.session.userId) return true;

  if (!token) {
    return false;
  } else {
    jwt.verify(token, "bobthebuilder", function (err, decoded) {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  }
};
app.use((req, res, next) => {
  req.isAuthenticated = () => {
    if (!isAuthenticated(req)) {
      return false;
    }

    return true;
  }

  res.locals.isAuthenticated = isAuthenticated(req);
  next();
});

//Our routes. Need make sure this is at the buttom of the page
const routes = require("./routes.js");
app.use("/api", routes); //work as a api. The node app servers React app

//Handles any requests that donot match the ones above will go index page
app.get("*", (req, res) => {
  console.log(req.path);
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on ${port}`));
