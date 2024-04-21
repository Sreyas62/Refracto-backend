const  departmentsController  = require('../controllers/department.controller');

const express = require('express');
const routes = express.Router();
console.log("route working")
routes.route('/signin').post(departmentsController.signinDepartments);
// superadmin
routes.route('/register').post(departmentsController.registerDepartment);

routes.route('/getdepartment').get(departmentsController.getDepartmentbyName);

module.exports = routes;