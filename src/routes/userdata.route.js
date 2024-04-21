const  userController  = require('../controllers/userdata.controller');

const express = require('express');
const routes = express.Router();

routes.route('/')
    .get(userController.getUserData);

module.exports = routes;
