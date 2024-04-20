const MassDataModel = require('../models/massdata.model');

exports.getmassData = async (req, res) => {
    try {
        console.log("service working")
        const departments = await MassDataModel.find();
        return departments;
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}