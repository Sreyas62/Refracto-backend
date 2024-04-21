const express = require('express');
const router = express.Router();
const chatgptController = require('../controllers/chatgpt.controller');

// Define your routes
// router.get('/askchatgpt', chatgptController.askchatgpt);
router.route('/handlecomplaints').post(chatgptController.handlecomplaints);
// Add more routes as needed

module.exports = router;