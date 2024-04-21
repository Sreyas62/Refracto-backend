const UserDataModel = require('../models/userdata.model');

exports.getUserData = async (req) => {
    try {
        const id=req.id
        console.log("service working")
        const user = await UserDataModel.find({user_id:req});
        if (user.length === 0) {
            return { message: "User not found" };
        }
        else{
            return user;
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}