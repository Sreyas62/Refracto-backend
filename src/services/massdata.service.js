const MassDataModel = require('../models/massdata.model');
const userDataModel = require('../models/userdata.model');

exports.getmassData = async (req, res) => {
    try {
        console.log("service working")
        const massData = await MassDataModel.find();
        return massData;
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.checkmassData = async (req, res) => {
    try {
       const {aadhaar_id,phone_no,state}= req
        console.log("service working")
        const massData = await MassDataModel.find({aadhaar_id,phone_no});
         if(massData){
            
        const user_name=massData[0].name;
           // console.log(massData[0])
           const userdata = new userDataModel({user_name,...req});
           const response = await userdata.save();
            return{
                // username:massData[0].name,
                message:"User verified successfully"
            }
         }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}