const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    date: {
        type: String,
        default: '',
    },
    client: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
    comment: {
        type: String,
        default: '',
    },
    full: {
        type: String,
        default: '',
    },
    advance: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    user_id: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 1,
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Order', OrderSchema);