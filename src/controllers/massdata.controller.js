const massDataService = require('../services/massdata.service');

exports.getDepartments = async (req, res) => {
    try {
        console.log("controller working")
        const details = req.body;
        console.log(details);
        const departments = await departmentService.getDepartments();
        res.send(departments)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}