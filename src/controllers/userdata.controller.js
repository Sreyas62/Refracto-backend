const userDataService = require('../services/userdata.service');

exports.get = async (req, res) => {
    try {
        console.log("controller working")
        const details = req.body;
        console.log(details);
        const user = await userDataService.getUserData();
        res.send(user)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}