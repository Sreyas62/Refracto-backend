const departmentService = require('../services/department.service');

exports.signinDepartments = async (req, res) => {
    try {
        console.log("controller working")
        const details = req.body;
        console.log(details);
        const departments = await departmentService.signinDepartments(details);
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
        console.log(departments)
        res.send(departments)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

