const Blog = require("../models/blog");

exports.index = (req, res) => {
  Blog.find()
    .published()
    .populate("author")
    .then(blogs => res.json(blogs))
    .catch(err => res.status(404).send(err));
};

exports.drafts = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Sign in idget" });
  Blog.find({
    author: req.session.userId
  })
    .drafts()
    .then(blogs => {
      res.render("blogs/index", {
        blogs: blogs,
        title: "Drafts"
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.published = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Sign in idget" });
  Blog.find({
    author: req.session.userId
  })
    .published()
    .then(blogs => {
      res.render("blogs/index", {
        blogs: blogs,
        title: "Published"
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.show = (req, res) => {
  Blog.findOne({
    _id: req.params.id
  })
    .published()
    .populate("author")
    .then(blog => res, json(blog))
    .catch(err => res.status(401).send(err));
};

//edit and show almost the some, they use same form
exports.edit = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Sign in idget" });
  Blog.findOne({
    _id: req.params.id,
    author: req.session.userId
  })
    .then(blog => res.json(blog))
    .catch(err => res.status(404).send(err));
};

exports.create = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Sign in idget" });
  req.body.blog.author = req.session.userId;
  Blog.create(req.body.blog)
    .then(() => {
      res.status(201).send({ success: "Blog was successgully created" });
    })
    .catch(err => res.status(404).send(err));
};

exports.update = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Sign in idget" });
  Blog.updateOne(
    {
      _id: req.body.id,
      author: req.session.userId
    },
    req.body.blog,
    {
      runValidators: true
    }
  )
    .then(() =>
      res.status(202).send({ success: "Your blog was successfully updated" })
    )
    .catch(err => res.status(400).send(err));
};

exports.destroy = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Sign in idget" });
  Blog.deleteOne({
    _id: req.body.id,
    author: req.session.userId
  })
    .then(() =>
      res.status(202).send({ success: "Your blog was successfully destroyed" })
    )
    .catch(err => res.status(400).send(err));
};
