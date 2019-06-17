const Blog = require('../models/blog');

exports.index = (req, res) => {
  req.isAuthenticated();
    Blog.find({
      author: req.session.userId
    })
    .populate('author')
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
  
  exports.drafts = (req, res) => {
    req.isAuthenticated();
    Blog.find({
      author: req.session.userId
    }).drafts()
      .then(blogs => {
        res.render('blogs/index', {
          blogs: blogs,
          title: 'Drafts'
        });

      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
      });
  };

  exports.published = (req, res) => {
    req.isAuthenticated();
    Blog.find({
      author: req.session.userId
    }).published()
      .then(blogs => {
        res.render('blogs/index', {
          blogs: blogs,
          title: 'Published'
        });

      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
      });
  };

  exports.show = (req, res) => {
    req.isAuthenticated();
    Blog.findOne({
      _id: req.params.id,
      author: req.session.userId
    })
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
    req.isAuthenticated();

    res.render('blogs/new', {
      title: 'New Blog Post'
    });
  };

//edit and show almost the some, they use same form
exports.edit = (req, res) => {
  req.isAuthenticated();
  Blog.findOne({
    _id: req.params.id,
    author: req.session.userId
  })
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
  req.isAuthenticated();
  req.body.blog.author = req.session.userId;
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
    req.isAuthenticated();
    Blog.updateOne({
        _id: req.body.id,
        author:req.session.userId
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
  req.isAuthenticated();
    Blog.deleteOne({
        _id: req.body.id,
        author: req.session.userId

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
  req.isAuthenticated();
    Blog.find({
      author: req.session.userId
    }).drafts()
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
    req.isAuthenticated();
    
    Blog.find({
      author: req.session.userId
    }).published()
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
