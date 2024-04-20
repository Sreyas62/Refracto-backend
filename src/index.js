const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const connectToDatabase = require('./config/db');
const chatgptRoute = require('./routes/chatgpt.route');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define your routes here
const Routes = require('./routes');
app.use('/', Routes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

// Connect to the database
connectToDatabase();
