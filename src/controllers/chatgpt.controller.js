// Import any required services or models here
const chatGptService = require('../services/chagpt.service');

// Define your controller methods
exports.askchatgpt = async (req, res) => {
  try {
    console.log("contorller working")
    const examples = await exampleService.askchatgpt();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.handlecomplaints = async (req, res) => {
  try {
    console.log("contorller working")
    const complaint=req.body
    console.log(complaint)
    const examples = await chatGptService.handlecomplaints(complaint);
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}