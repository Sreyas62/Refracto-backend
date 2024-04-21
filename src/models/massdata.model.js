const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const massDataSchema = new mongoose.Schema({
    aadhaar_id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
     phone_no : {
        type : String,
        required : true
     }

})

massDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const MassData = mongoose.model('massdata', massDataSchema);

module.exports = MassData;