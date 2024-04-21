const massDataService = require('../services/massdata.service');

exports.getMassData = async (req, res) => {
    try {
        console.log("controller working")
        const getmassdata = await massDataService.getmassData();
        res.send(getmassdata)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.checkMassData = async (req, res) => {
    try {
        console.log("controller working")
        const checkmassdata = await massDataService.checkmassData(req.body);
        res.send(checkmassdata)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}