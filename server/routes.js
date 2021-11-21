const express = require('express');

const UserController = require('../controller/User');

const routes = express.Router();

routes.post('/', UserController.post);
routes.get('/', UserController.get);
routes.put('/', UserController.put);
routes.delete('/', UserController.delete);

module.exports = routes;