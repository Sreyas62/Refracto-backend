const  massdataController  = require('../controllers/massdata.controller');
const express = require('express');
const routes = express.Router();
console.log("route working")
routes.route('/')
.get(massdataController.getMassData)
.post(massdataController.checkMassData);

module.exports = routes;