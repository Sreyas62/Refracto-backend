const userDataService = require('../services/userdata.service');

exports.getUserData = async (req, res) => {
    try {
        const id=req.query.user_id
        console.log("controller working")
        console.log(id);
        const user = await userDataService.getUserData(id);
        res.send(user)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}