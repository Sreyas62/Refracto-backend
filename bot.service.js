const TelegramBot = require('node-telegram-bot-api');
console.log('Bot has been started ...');const axios = require('axios');

const dotenv = require('dotenv');
const { use } = require('./src/routes');
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

const apiCallFroDetails = async (user_id) => {
  try {
      const response = await axios.get('http://localhost:3000/user',{ params: { user_id } } );
      return response.data;
      
  } catch (error) {
      console.error('Error calling backend API:', error);
      throw new Error('Error calling backend API');
  }
}

const apiCallToSendForVerification = async (user) => {
  try {
      const response = await axios.post('http://localhost:3000/massdatas',user );
      console.log(response.data);
      return response.data;
      
  } catch (error) {
      console.error('Error calling backend API:', error);
      throw new Error('Error calling backend API');
  }
}
const apiCallToSendProblem = async (problem) => {
  try {
      const response = await axios.post('http://localhost:3000/chatgpt/handlecomplaints',problem );
      console.log(response.data);
      return response.data;
      
  } catch (error) {
      console.error('Error calling backend API:', error);
      throw new Error('Error calling backend API');
  }
}

const apiCallToTrackComplaint = async (user_id) => {
  try {
      const response = await axios.get('http://localhost:3000/massdatas',{ params: { user_id } } );
      return response.data;
  } catch (error) {
      console.error('Error calling backend API:', error);
      throw new Error('Error calling backend API');
  }
}

bot.onText(/\/start/,async (msg) => {
  const chatId = msg.chat.id;
  const user =await apiCallFroDetails(chatId);
  console.log(user);
  if (user.message==="User not found") { 
  users[chatId] = { state: 'waitingForPhoneNumber' };
  users[chatId].timestamp = Date.now();
  bot.sendMessage(chatId, 'Hello! Please enter your phone number:');
  }
  else if (user[0].state !== 'waitingForPhoneNumber' && user[0].state !== 'waitingForAadhaar') {
    users[chatId] = user[0];
    bot.sendMessage(chatId, 'Hello! Choose an option:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Create a complaint', callback_data: 'CreateNewComplaint' }],
          [{ text: 'Track existing complaint', callback_data: 'TrackExistingComplaint' }]
        ]
      }
    });
  }
 else if (users[chatId].state !== 'waitingForPhoneNumber' && users[chatId].state !== 'waitingForAadhaar') {
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

bot.on('message', async(msg) => {
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
      bot.sendMessage(chatId, 'Send for verification');
      apiCallToSendForVerification({user_id:chatId,aadhaar_id:user.aadhaar,phone_no:user.phoneNumber,state:'waitingForProblem'});
      break;
    case 'waitingForVerification' :
      bot.sendMessage(chatId, '/start');
    case 'waitingForProblem':
      user.problem = msg.text;
      bot.sendMessage(chatId, '/start');
      break;
    case 'problemTitleWaiting':
      user.problemTitle = msg.text;
      user.state = 'problemTitleReceived';
      bot.sendMessage(chatId, 'Please enter the details of your problem:');
      break;
    case 'problemTitleReceived':
      user.problemDetails = msg.text;
      user.state = 'problemDetailsReceived';
      bot.sendMessage(chatId, 'Your complaint has been successfully submitted. Thank you!');
      apiCallToSendProblem({user_id:chatId,problemTitle:user.problemTitle,problemDetails:user.problemDetails,state:'problemDetailsReceived'})
      console.log('Problem received:');
      break;
  }
  console.log(users);
});

bot.on('callback_query', async(query) => {
  const chatId = query.message.chat.id;
  const user = users[chatId];
  console.log(user);
  if (!user) return;

  switch (query.data) {
    case 'CreateNewComplaint':
      bot.sendMessage(chatId, 'You have chosen to create a complaint.\n Please name your problem:');
      user.state = 'problemTitleWaiting';
      break;
    case 'TrackExistingComplaint':
      users.state='waitingForTrack';
      const track=await apiCallToTrackComplaint(chatId);
      bot.sendMessage(chatId, 'Your complaint tracking details is:');
      break;
    default:
      // Handle unrecognized callback data
      break;
  }
});