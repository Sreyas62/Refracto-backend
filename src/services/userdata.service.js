const UserDataModel = require('../models/userdata.model');

exports.getUserData = async (req) => {
    try {
        
        console.log("service working")
        const user = await UserDataModel.find(req);
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