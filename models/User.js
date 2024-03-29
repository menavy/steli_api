const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: '',
    },
    currency: {
        type: String,
        required: false,
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', UserSchema);