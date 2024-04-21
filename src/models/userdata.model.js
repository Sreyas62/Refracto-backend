const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const userDataSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true
    },
    user_name : {
        type : String,
    },
    aadhaar_id : {
        type : String,
        required : true
    },
    phone_no : {
        type : String,
        required : true
    },
    state:{
        type:String,
        required:true
    }
    }
);

userDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const userData = mongoose.model('userData', userDataSchema);

module.exports = userData;