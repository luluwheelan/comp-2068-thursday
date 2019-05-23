const express = require('express');
const app = express();


//Import our Page Routes
const pageRoutes = require('./routes/pages');


//Register our Page Routes with out app
app.use('/', pageRoutes);

//Export our changes
module.exports = app;