const DepartmentModel = require('../models/department.model');
const bcrypt = require('bcrypt');

exports.getDepartments = async (req, res) => {
    try {
        console.log("service working")
        const departments = await DepartmentModel.find();
        return departments;
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = exports;

exports.registerDepartment = async (details) => {
    try {
        const {  departmentName,departmentEmail, departmentPassword } = details;
        console.log("details",departmentEmail,departmentPassword)
        bcrypt.hash(departmentPassword, 5, async (err, hash) => {
            if (err) return ({ message: "Something went wrong",status:0 })
            try{
                let dept = new DepartmentModel({departmentName,departmentEmail,departmentPassword:hash})
                await dept.save()
                return({message:"User registered successfully",status:1})
            } catch (error) {
                return({
                    message: error.message,
                    status: 0
                })
            }
        })
        const department = new DepartmentModel(details);
        const response = await department.save();
        return response;
    }
    catch (error) {
        return({ message: error.message });
    }
}