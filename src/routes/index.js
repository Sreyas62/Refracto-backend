const DepartmentRoutes = require('./department.route');
const MassDataRoutes = require('./massdata.route');
const UserDataRoutes = require('./userdata.route');
const SuperadminRoutes = require('./superadmin.route');

const ChatgptRoutes=require('./chatgpt.route')

const express = require('express');
const routes = express.Router();
console.log("route working")
routes.use('/departments',DepartmentRoutes);
routes.use('/massdatas',MassDataRoutes)
routes.use('/user',UserDataRoutes)

routes.use('/superadmin',SuperadminRoutes);
routes.use('/chatgpt',ChatgptRoutes)




module.exports = routes;