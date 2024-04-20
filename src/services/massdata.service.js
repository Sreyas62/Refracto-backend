const MassDataModel = require('../models/massdata.model');

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
       const {aadhaar_id,phone_no}= req
        console.log("service working")
        const massData = await MassDataModel.find({aadhaar_id,phone_no});
         if(massData){
            return{
                username:massData.name,
                message:"User verified successfully"
            }
         }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}