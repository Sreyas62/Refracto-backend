const superadminService = require('../services/superadmin.service');

exports.getDepartments = async (req, res) => {
    try {

        const response = await superadminService.getDepartments();
        res.send(response)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.registerDepartment = async (req, res) => {
    try {
        const details = req.body;
        const departments = await superadminService.registerDepartment(details);
        console.log(departments)
        res.send(departments)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}