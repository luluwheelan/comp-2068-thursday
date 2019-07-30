const Author = require("../models/author");
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res) => {
  console.log(req.body);
  Author.findOne({
    email: req.body.email
  })
    .then(author => {
      author.authenticate(req.body.password, (err, isMatch) => {
        if (err) throw new Error(err);

        if (isMatch) {
          req.session.userId = author.id;
          //payload is the part will encrypt, second is the salt
          //here is create a token
          const token = jwt.sign({ payload: req.body.email }, "bobthebuilder", {
            expiresIn: "1h"
          });
          res
            .cookie("token", token, { httpOnly: true })
            .status(201)
            .send({ success: "You were authenticated you wonderful human." });
        } else {
          res.status(401).json(err);
        }
      });
    })
    .catch(err => {
      console.log("Not match", err);
      res.status(401).json(err);
    });
};

exports.logout = (req, res) => {
  req.session.userId = null;
  req.flash("success", "You are logged out");
  res.redirect("/");
};
