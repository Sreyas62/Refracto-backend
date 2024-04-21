const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TELE_API_KEY; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

const users = {};

// Function to delete entries older than 5 minutes
function deleteOldEntries() {
  const currentTime = Date.now();
  for (const chatId in users) {
    const entryTime = users[chatId].timestamp;
    if (currentTime - entryTime > 5 * 60 * 1000) {
      delete users[chatId];
    }
    console.log(users);
  }
}

// Call the deleteOldEntries function every 5 minutes
setInterval(deleteOldEntries, 5 * 60 * 1000);

const callBackendAPI = async () => {
  try {
      const response = await axios.get('http://localhost:3000/api/endpoint'); 
      return response.data;
  } catch (error) {
      console.error('Error calling backend API:', error);
      throw new Error('Error calling backend API');
  }
}



bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  if (!users[chatId]) { 
  users[chatId] = { state: 'waitingForPhoneNumber' };
  users[chatId].timestamp = Date.now();
  bot.sendMessage(chatId, 'Hello! Please enter your phone number:');
  }
  if (users[chatId].state !== 'waitingForPhoneNumber' && users[chatId].state !== 'waitingForAadhaar') {
    bot.sendMessage(chatId, 'Hello! Choose an option:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Create a complaint', callback_data: 'CreateNewComplaint' }],
          [{ text: 'Track existing complaint', callback_data: 'TrackExistingComplaint' }]
        ]
      }
    });
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const user = users[chatId];
  if (!user) return;

  switch (user.state) {
    case 'waitingForPhoneNumber':
      user.phoneNumber = msg.text;
      if (user.phoneNumber.length !== 10 || isNaN(user.phoneNumber)) {
        bot.sendMessage(chatId, 'Please enter a valid 10-digit phone number:');
        return;
      }
      user.state = 'waitingForAadhaar';
      bot.sendMessage(chatId, 'Please enter your Aadhaar number:');
      break;
    case 'waitingForAadhaar':
      user.aadhaar = msg.text;
      if (user.aadhaar.length !== 12 || isNaN(user.aadhaar)) {
        bot.sendMessage(chatId, 'Please enter a valid 12-digit Aadhaar number:');
        return;
      }
      user.state = 'waitingForVerification';
      bot.sendMessage(chatId, 'Send for verification:');
      break;
    case 'waitingForProblem':
      user.problem = msg.text;
      user.state = 'waitingForConfirmation';
      bot.sendMessage(chatId, 'Thank you for your message. We will get back to you soon.');
      break;
    case 'waitingForConfirmation':
      delete users[chatId];
     //send the message to the admin
      break;
  }
  console.log(users);
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const user = users[chatId];
  if (!user) return;

  switch (query.data) {
    case 'CreateNewComplaint':
      bot.sendMessage(chatId, 'You have chosen to create a complaint.');
      break;
    case 'TrackExistingComplaint':
      bot.sendMessage(chatId, 'You have chosen to track an existing complaint.');
      break;
    default:
      // Handle unrecognized callback data
      break;
  }
});