const UserDataModel = require('../models/userdata.model');

exports.getUserData = async (req, res) => {
    try {
        const id=req.id
        console.log("service working")
        const user = await UserDataModel.find({id});
        if (user.length === 0) {
            return { message: "User not found" };
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}