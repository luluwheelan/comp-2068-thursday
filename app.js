const express = require('express');
const app = express();

//two param: path and callback function
app.get('/', (request, response) => {
    response.send(`Hey dere world`);
});

app.get('/about', (request, response) => {
    response.send(`I like long walks on the beach.`);
});

app.listen(4000, () => console.log('Listening on 4000'));