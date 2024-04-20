const DepartmentRoutes = require('./department.route');
const MassDataRoutes = require('./massdata.route');

const express = require('express');
const routes = express.Router();
console.log("route working")
routes.use('/departments',DepartmentRoutes);
routes.use('/massdata',MassDataRoutes)




module.exports = routes;