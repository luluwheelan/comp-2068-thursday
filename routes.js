const express = require('express');
const app = express();


//Import our Page Routes
//const pageRoutes = require('./routes/pages');
const blogRoutes = require('./routes/blogs');
const authorsRoutes = require('./routes/authors');
const sessionsRoutes = require('./routes/sessions');


//Register our Page Routes with our app
//app.use('/', pageRoutes);
app.use('/blogs', blogRoutes);
app.use('/authors', authorsRoutes);
app.use('/', sessionsRoutes);

//Export our changes
module.exports = app;