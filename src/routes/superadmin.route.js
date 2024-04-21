const  superadminController  = require('../controllers/superadmin.controller');

const express = require('express');
const routes = express.Router();
console.log("route working")
routes.route('/alldepartments').get(superadminController.getDepartments);
routes.route('/registerdept').post(superadminController.registerDepartment);

module.exports = routes;