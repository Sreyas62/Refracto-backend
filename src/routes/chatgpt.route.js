const express = require('express');
const router = express.Router();
const chatgptController = require('../controllers/chatgpt.controller');

// Define your routes
router.get('/askchatgpt', chatgptController.askchatgpt);

// Add more routes as needed

module.exports = router;