const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const complaintDataSchema = new mongoose.Schema({
    departmentID : {
        type : String,
        required : true
    },
    user_id : {
        type : Number,
        
    },
    departmentName : {
        type : String,
        required : true
    },
    complaint : {
        type : String,
        required : true
    },
    
});

complaintDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const Complaint = mongoose.model('complaint', complaintDataSchema);

module.exports = Complaint;