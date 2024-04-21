const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const superadminDataSchema = new mongoose.Schema({
    superadminID : {
        type : String,
        required : true
    },
    superadminName : {
        type : String,
        required : true
    },
    superadminEmail : {
        type : String,
        required : true
    },
    superadminPassword:{
        type : String,
        required : true
    }
    
    // Picture : {
    // //     type : String,
    // // },
});

superadminDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const Superadmin = mongoose.model('superadmin', superadminDataSchema);

module.exports = Superadmin;