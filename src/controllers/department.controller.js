const departmentService = require('../services/department.service');

exports.signinDepartments = async (req, res) => {
    try {
        const details = req.body;
        const response = await departmentService.signinDepartments(details);
        console.log('here',response)
        res.send({response})
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



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
exports.getDepartmentbyName= async (req, res) => {
    try {
        const dep_Name= req.query.dep_name;
        console.log(dep_Name)
        const department = await departmentService.getDepartmentbyName(dep_Name);
        res.send(department)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = exports;