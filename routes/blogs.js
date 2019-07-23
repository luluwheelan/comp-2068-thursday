const router = require('express').Router();

const BlogsController = require('../controllers/blogsController');

//Begin routers
router.get('/', BlogsController.index);
// router.get('/drafts', BlogsController.drafts);
// router.get('/published', BlogsController.published);
//router.get('/new', BlogsController.new);
router.get('/:id', BlogsController.show); //show single blog
router.get('/:id/edit', BlogsController.edit);
router.post('/', BlogsController.create);
router.post('/update', BlogsController.update);
router.post('/destroy', BlogsController.destroy);

//End routers

module.exports = router;