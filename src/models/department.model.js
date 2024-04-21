const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const departmentDataSchema = new mongoose.Schema({
    departmentID : {
        type : String,
        required : true
    },
    adminName : {
        type : String,
        required : true
    },
    departmentName : {
        type : String,
        required : true
    },
    adminEmail : {
        type : String,
        required : true
    },
    adminPassword:{
        type : String,
        required : true
    }
    
    // Picture : {
    // //     type : String,
    // // },
});

departmentDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const Department = mongoose.model('department', departmentDataSchema);

module.exports = Department;