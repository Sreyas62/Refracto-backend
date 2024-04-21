const DepartmentModel = require('../models/department.model');
const bcrypt = require('bcrypt');

exports.signinDepartments = async (details) => {
    const { adminEmail, adminPassword } = details;
    try {
        const data = await DepartmentModel.findOne({ adminEmail }); // Using findOne to get a single document
        
        if (!data) {
            return { message: "User not found", status: 0 };
        }

        const result = await bcrypt.compare(adminPassword, data.adminPassword);

        if (result) {
            const response = {
                departmentID: data.departmentID,
                adminName: data.adminName,
                departmentName: data.departmentName
            };
            return {
                message: "Login successful",
                data: response,
                status: 1
            };
        } else {
            return { message: "Incorrect password", status: 0 };
        }
    } catch (error) {
        return { message: "Something went wrong: " + error.message, status: 0 };
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

exports.getDepartmentbyName=async(dep_Name)=>{
    try{
        const department=await DepartmentModel.findOne({departmentName:dep_Name});
        return department;
    }
    catch(error){
        return {message:error.message,status:0}
    }
}
module.exports = exports;