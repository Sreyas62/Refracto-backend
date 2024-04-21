const DepartmentModel = require('../models/department.model');
const bcrypt = require('bcrypt');

exports.getDepartments = async () => {
    try {
        const departments = await DepartmentModel.find();
        const response = departments.map(department => {
            return {
                departmentID: department.departmentID,
                departmentName: department.departmentName
            };
        }
        );
        return response;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

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


module.exports = exports;