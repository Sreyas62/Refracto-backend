const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const massDataSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    // Email : {
    //     type : String,
    //     required : true
    // },
    // Picture : {
    //     type : String,
    // },
});

userDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const MassData = mongoose.model('massdata', massDataSchema);

module.exports = MassData;