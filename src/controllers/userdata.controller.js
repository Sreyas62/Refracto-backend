const userDataService = require('../services/userdata.service');

exports.getUserData = async (req, res) => {
    try {
        const user_id=req.query.user_id
        console.log("controller working")
        
        const user = await userDataService.getUserData({user_id});
        res.send(user)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}