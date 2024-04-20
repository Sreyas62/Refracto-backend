// Import any required models here
// const Example = require('../models/example');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Define your service methods
exports.askchatgpt = async () => {

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("service working");

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "user",
      "content": "hai"
    }
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
console.log("service working",response);
return response.choices[0].message.content;
  // return await Example.find();

};

// exports.createExample = async (name) => {
//     console.log("controllr",name);
//   const resp = await userData.create({Name:name});
//   console.log(resp);
//   return resp;
// };