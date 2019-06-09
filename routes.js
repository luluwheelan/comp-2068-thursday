const express = require('express');
const app = express();


//Import our Page Routes
const pageRoutes = require('./routes/pages');
const bookRoutes = require('./routes/books');


//Register our Page Routes with our app
app.use('/', pageRoutes);
app.use('/books', bookRoutes);

//Export our changes
module.exports = app;