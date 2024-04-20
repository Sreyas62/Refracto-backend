const e = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const token = '7163245346:AAFeatavH8mR2hhmxq1pG1ARYkA5-UXuymo'; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

let waitingForAadhaar = false;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello! Choose an option:', {
      reply_markup: {
          inline_keyboard: [
              [{ text: 'Verify your user', callback_data: 'verifyUser' }],
              [{ text: 'Option 2', callback_data: 'option2' }]
          ]
      }
  });
});
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const chosenOption = query.data;
  if(chosenOption==='verifyUser'){
    bot.sendMessage(chatId, `Enter your Aadhaar number`);
    waitingForAadhaar = true;
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  console.log(msg);
  if (waitingForAadhaar) {
    if (!isNaN(messageText) && messageText.length === 12) {
      console.log('Aadhaar number received:', messageText);
      bot.sendMessage(chatId, `Aadhaar number ${messageText} received.`);
      waitingForAadhaar = false;
    } else {
      bot.sendMessage(chatId, 'Invalid Aadhaar number. Please enter a valid number.');
    }
  } else {
    bot.sendMessage(chatId, `Eda mone ${msg.chat.first_name} sugamano...`);
  }
});