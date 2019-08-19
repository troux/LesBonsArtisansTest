const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const product = require('../Products');
const router = require('./router');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send({
        res: `Home`
    }).end();
});

app.use(router);

app.listen(8080);
console.log('Listening on port 8080');

//to remove
request.post('http://localhost:8080/file', {
    json: {
        product: product
    }
}, (error, res, body) => {
    if (error) {
        console.error(error);
        return
    }
    console.log(`statusCode: ${res.statusCode}`);
    console.log(body);
});
//end to remove