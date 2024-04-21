const DepartmentModel = require('../models/department.model');

exports.getDepartments = async () => {
    try {
        const departments = await DepartmentModel.find();
        return departments;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports = exports;