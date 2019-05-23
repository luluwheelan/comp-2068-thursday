const express = require('express');
const app = express();

//two param: path and callback function
app.get('/', (request, response) => {
    response.send(`Hey dere world`);
});

app.get('/about', (request, response) => {
    response.send(`I like long walks on the beach.`);
});

const port = (process.env.PORT || 4000);
app.listen(port, () => console.log(`Listening on ${post}`));
