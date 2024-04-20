const departmentRoutes = require('./department.route');

const express = require('express');
const routes = express.Router();
console.log("route working")
routes.use('/departments',departmentRoutes);




module.exports = routes;