const departmentService = require('../services/department.service');

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

module.exports = exports;

exports.registerDepartment = async (req, res) => {
    try {
        const details = req.body;
        const departments = await departmentService.registerDepartment(details);
        res.send(departments)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}