const  userController  = require('../controllers/userdata.controller');

const express = require('express');
const routes = express.Router();
console.log("route working")
routes.route('/').post(userController.getUserData);
// routes.route('/register').post(departmentsController.registerDepartment);

module.exports = routes;