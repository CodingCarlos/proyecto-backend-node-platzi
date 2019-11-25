const express = require('express');

const response = require('../../../network/response');
const Controller = require('./controller');

const router = express.Router();

router.get('/', function (req, res) {
    const lista = Controller.list();
    response.success(req, res, lista, 200);
})

module.exports = router;