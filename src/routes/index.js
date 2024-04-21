const SuperadminRoutes = require('./superadmin.route');
const departmentRoutes = require('./department.route');

const express = require('express');
const routes = express.Router();
console.log("route working")
routes.use('/departments',departmentRoutes);
routes.use('/superadmin',SuperadminRoutes);




module.exports = routes;