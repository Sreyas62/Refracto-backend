// Import any required models here
// const Example = require('../models/example');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Define your service methods
exports.askchatgpt = async (complaint) => {
const department_details=[
  {departmentID: 284376,
  departmentName: "Police"
  },{
    departmentID: "76582",
    departmentName: "ConsumerCourt"
  },
  {
    departmentID: "345674",
    departmentName: "Cybercell"
  },{
  departmentID: "643359",
  departmentName: "Court"},
  {
    departmentID: "345673",
  departmentName: "VillageOffice"
  },
  {
    departmentID: "340074",
    departmentName: "Panchayath",
  }

]
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const details = JSON.stringify(department_details);
console.log("service yaya",complaint);

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "user",
      "content": `from the content object ${complaint} ,i need a json object with compaint which is a details and short description of the problem and problem_title which is the title of the problem and identify the department name and id from ${department_details} under which the problem falls under`
    }
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
console.log("service working",response);
const data=JSON.parse(response.choices[0].message.content);
return data;
  // return await Example.find();

};

// exports.createExample = async (name) => {
//     console.log("controllr",name);
//   const resp = await userData.create({Name:name});
//   console.log(resp);
//   return resp;
// };



exports.handlecomplaints = async (complaint) => {
  console.log("service working in complaints ");
  const response= await askchatgpt(complaint);
  return response;
}