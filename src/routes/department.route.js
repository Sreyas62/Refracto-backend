const  departmentsController  = require('../controllers/department.controller');

const express = require('express');
const routes = express.Router();
console.log("route working")
routes.route('/signin').post(departmentsController.signinDepartments);
routes.route('/register').post(departmentsController.registerDepartment);

module.exports = routes;