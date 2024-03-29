const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    disabled:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Admin', AdminSchema);