const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    mongodb_uri: process.env.MONGODB_URI
    // Add other configuration options here
  };