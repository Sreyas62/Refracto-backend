const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELE_API_KEY; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

const users = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  users[chatId] = { state: 'waitingForPhoneNumber' };
  bot.sendMessage(chatId, 'Hello! Please enter your phone number:');
});

bot.on('message', (msg) => {
  console.log(users);
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
      user.state = 'waitingForProblem';
      bot.sendMessage(chatId, 'Please describe your problem:');
      break;
    case 'waitingForProblem':
      user.problem = msg.text;
      user.state = 'waitingForConfirmation';
      bot.sendMessage(chatId, 'Thank you for your message. We will get back to you soon.');
      break;
  }
});

bot.on('callback_query', (query) => {
  // Handle callback queries here
});