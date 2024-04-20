const DepartmentModel = require('../models/department.model');
const bcrypt = require('bcrypt');

exports.signinDepartments = async (details) => {
    const { adminEmail, adminPassword } = details;
    try {
        const data = await DepartmentModel.find(adminEmail );
        console.log('this',data)
        return data;
    }
    catch (error) {
        return({message: "user not found", status: 0});
    }
}

module.exports = exports;

exports.registerDepartment = async (details) => {
    try {
        const { departmentID, adminName, departmentName, adminEmail, adminPassword } = details;
        if(await DepartmentModel.findOne({ adminEmail })) {
            return { message: "User already exists", status: 0 };
        }
        const hashedPassword = await bcrypt.hash(adminPassword, 5);

        const dept = new DepartmentModel({
            departmentID,
            adminName,
            departmentName,
            adminEmail,
            adminPassword: hashedPassword 
        });

        const response = await dept.save();

        return { message: "User registered successfully", status: 1, data: response };
    } catch (error) {
        return { message: error.message, status: 0 };
    }
}
