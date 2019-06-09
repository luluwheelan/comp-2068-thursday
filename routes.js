const express = require('express');
const app = express();


//Import our Page Routes
const pageRoutes = require('./routes/pages');
const blogRoutes = require('./routes/blogs');


//Register our Page Routes with our app
app.use('/', pageRoutes);
app.use('/blogs', blogRoutes);

//Export our changes
module.exports = app;