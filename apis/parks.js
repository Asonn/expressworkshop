const express = require('express');
let router = express.Router();
const parkService = require('../data/park-service');

router
    .get('/', (req, res) => {
        parkService.get().then(parks => {
            res.json(parks);
        });
    })
    .post('/', (req, res) => {
        parkService.save(req.body).then(() => {
            res.status(201);
            res.end();
        });
    });

module.exports = router;