const router = require(`express`).Router();

//Our controllers
const PageController = require('../controller/pagesController');



//Create our routes
router.get('/', PageController.show);
router.get('/about', PageController.show);
router.get('/contact', PageController.show);



// router.get('/', (req, res) => {
// 	res.send(`Hello world!`);
// });

// router.get('/about',(req, res) =>{
// 	res.send(`I like long wals on the beach.`);
// })

//modele and process is global objects
module.exports = router;
