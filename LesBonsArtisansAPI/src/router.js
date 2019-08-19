const checkProperty = require('./checkProperty.js');
const Router = require('express').Router;

const router = Router();
let file = {};

router.get('/data', (req, res) => {
    if (file !== {}) {
        res.status(200).send({res: file}).end();
    } else {
        res.status(200).send({res: "File is empty"}).end();
    }
});

router.post('/file', (req, res) => {
    try {
        if (req.body.product) {
            file = req.body.product;
            console.log(file);
            res.status(200).send({res: 'File uploaded'}).end();
        } else {
            res.status(400).send({res: 'Error: no file'}).end();
        }
    } catch (e) {
        res.status(500).send({error: e.toString}).end();
    }
});

router.patch('/data', (req, res) => {
    try {
        if (req.body && checkProperty(req.body)) {
            file[file.length] = req.body;
            res.status(200).send({res: 'File updated'}).end();
        } else {
            res.status(400).send({res: 'Error: product information incomplete'}).end();
        }
    } catch (e) {
        res.status(500).send({error: e.toString()}).end();
    }
});

router.delete('/data/:id', (req, res) => {
    try {
        let ID = Number(req.params.id);
        if (isNaN(ID)) {
            res.status(403).send({
                error: 'ID must be a number'
            }).end();
            return;
        }
        for (let i = 0; i < file.length; i++) {
            if (file[i]._id === ID)
                file.splice(i, 1);
        }
        res.status(200).send({res: "Product deleted"}).end();
    } catch (e) {
        res.status(500).send({error: e.toString}).end();
    }
});

module.exports = router;