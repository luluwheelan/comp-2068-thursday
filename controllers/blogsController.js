const Blog = require('../models/blog');

exports.index = (req, res) => {
    Blog.find()
      .then(blogs => {
        res.render('blogs/index', {
          blogs: blogs,
          title: 'Archive'
        });
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
      });
  };
  

  exports.show = (req, res) => {
    Blog.findById(req.params.id)
      .then(blog => {
        res.render('blogs/show', {
          title: blog.title,
          blog: blog
        });
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
      });
  };

  exports.new = (req, res) => {
    res.render('blogs/new', {
      title: 'New Blog Post'
    });
  };

//edit and show almost the some, they use same form
exports.edit = (req, res) => {
    Blog.findById(req.params.id)
      .then(blog => {
        res.render('blogs/edit', {
          title: `Edit ${blog.title}`,
          blog: blog
        });
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
      });
  };

exports.create = (req, res) => {
    Blog.create(
        req.body.blog
    //     {
    //     title: req.body.blog.title,
    //     content: req.body.blog.content,
    //     status: req.body.blog.status
    // }
    )
    .then(() => {
        req.flash('success', 'Your new blog was created successfully.')
        //no render from post!!!!! But redirect to other page
        res.redirect('/blogs');
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.render('blogs/new', {
          blog: req.body.blog,
          title: 'New Blog'
        });
      });
  };

  exports.update = (req, res) => {
    Blog.updateOne({
        _id: req.body.id
      }, req.body.blog, {
        runValidators: true
      })
      .then(() => {
        //Go to single blog
        //res.redirect(`/blogs/${req.body.id}`);

        req.flash('success', 'Your blog was updated successfully.');
      res.redirect('/blogs');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.render('blogs/edit', {
        blog: req.body.blog,
        title: `Edit ${req.body.blog.title}`
      });
    });
};

exports.destroy = (req, res) => {
    Blog.deleteOne({
        _id: req.body.id
      })
      .then(() => {
        req.flash('success', 'Your blog was deleted successfully.');
        res.redirect("/blogs");
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
      });
  };


//To fill in later
exports.drafts = (req, res) => {
    Blog.find().drafts()
      .then(drafts => {
        res.render('blogs/index', {
          title: 'Drafts',
          blogs: drafts
        });
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
      });
  };
  
  exports.published = (req, res) => {
    Blog.find().published()
      .then(published => {
        res.render('blogs/index', {
          title: 'Published',
          blogs: published
        });
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
      });
  };