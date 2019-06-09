const router = require('express').Router();

const BooksController = require('../controllers/booksController');

//Begin routers
router.get('/', BooksController.index);
router.get('/new', BooksController.new);
router.get('/:id', BooksController.show); //show single book
router.get('/:id/edit', BooksController.edit);
router.post('/', BooksController.create);
router.post('/update', BooksController.update);
router.post('/destroy', BooksController.destroy);

//End routers

module.exports = router;