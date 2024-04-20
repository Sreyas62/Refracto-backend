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
        const {  email, password } = details;
        console.log("details",email,password)
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) return ({ message: "Something went wrong",status:0 })
            try{
                let dept = new DepartmentModel({email,password:hash})
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