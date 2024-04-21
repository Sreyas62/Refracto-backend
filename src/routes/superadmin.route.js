const  superadminController  = require('../controllers/superadmin.controller');

const express = require('express');
const routes = express.Router();
console.log("route working")
routes.route('/alldepartments').get(superadminController.getDepartments);

module.exports = routes;