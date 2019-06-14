const Blog = require('../models/blog');

exports.index = (req, res) => {
    Blog.find()
      .then(blogs => {
        res.render('blogs/index', {
          blogs: blogs,
          title: 'Archive'
        });
<<<<<<< HEAD
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
      });
  };
  
=======
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
    });
};
>>>>>>> 1782a15aff03ad6b6496fb780a7e4b6521d910d4

  exports.show = (req, res) => {
    Blog.findById(req.params.id)
      .then(blog => {
        res.render('blogs/show', {
          title: blog.title,
          blog: blog
        });
<<<<<<< HEAD
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
      });
  };

  exports.new = (req, res) => {
=======
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
    });
};
exports.new = (req, res) => {
>>>>>>> 1782a15aff03ad6b6496fb780a7e4b6521d910d4
    res.render('blogs/new', {
      title: 'New Blog Post'
    });
  };

//edit and show almost the some, they use same form
exports.edit = (req, res) => {
    Blog.findById(req.params.id)
      .then(blog => {
        res.render('blogs/edit', {
<<<<<<< HEAD
          title: `Edit ${blog.title}`,
          blog: blog
        });
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
      });
  };
=======
            blog: blog,
            title: `Edit ${blog.title}`
        });
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
    });
};
>>>>>>> 1782a15aff03ad6b6496fb780a7e4b6521d910d4

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
        req.flash('success', 'Your new blog was create successfully.')
        res.redirect('/blogs');
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.render('blogs/new', {
<<<<<<< HEAD
          blog: req.body.blog,
          title: 'New Blog'
        });
      });
  };
=======
            blog: req.body.blog,
            title: 'New Blog'
        });
    });
};
>>>>>>> 1782a15aff03ad6b6496fb780a7e4b6521d910d4

  exports.update = (req, res) => {
    Blog.updateOne({
        _id: req.body.id
      }, req.body.blog, {
        runValidators: true
<<<<<<< HEAD
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
=======
    })
    .then(() => {
       // res.redirect(`/blogs/${req.body.id}`);
        req.flash('success', 'Your new blog was updated successfully.')
        res.redirect('/blogs');
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.render('blogs/edit', {
            blog: req.body.blog,
            title: `Edit ${req.body.blog.title}`
        });
>>>>>>> 1782a15aff03ad6b6496fb780a7e4b6521d910d4
    });
};

exports.destroy = (req, res) => {
    Blog.deleteOne({
        _id: req.body.id
<<<<<<< HEAD
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
=======
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



exports.drafts = (req, res) => {
    Blog.find().draft()
    .then(draft => {
        res.render('blog/index', {
            title: 'Draft',
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
        res.render('blog/index', {
            title: 'Published',
            blogs: published
        });
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
    });
};
>>>>>>> 1782a15aff03ad6b6496fb780a7e4b6521d910d4
