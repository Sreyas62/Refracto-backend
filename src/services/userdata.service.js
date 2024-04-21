const UserDataModel = require('../models/userdata.model');

exports.getUserData = async (req, res) => {
    try {
        console.log("service working")
        const user = await UserDataModel.find();
        return user;
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}