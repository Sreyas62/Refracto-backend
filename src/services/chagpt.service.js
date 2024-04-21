// Import any required models here
// const Example = require('../models/example');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const ComplaintModel = require('../models/complaint.model');

// Define your service methods
const askchatgpt = async (complaint) => {
  console.log('ivide',complaint)
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
      "content": `from the content object ${complaint} ,i need a json object with compaint which is a details and short description of the problem and problem_title which is the title of the problem and identify the department name and id from ${details} under which the problem falls under`
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
  console.log("service working in complaints ",complaint);
  const response=  await askchatgpt(complaint);


if(response){
  const {user_id}=complaint
  const Complaint= new ComplaintModel({
    user_id,...response
  })
  await Complaint.save();
}
return {
"message":"Complaints registered successfully",
}
  
}