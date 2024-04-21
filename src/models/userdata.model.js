const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const userDataSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    name : {
        type : String,
    },
    aadhaar_id : {
        type : String,
        required : true
    },
    phone_no : {
        type : String,
        required : true
    }
});

userDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const userData = mongoose.model('userData', userDataSchema);

module.exports = userData;