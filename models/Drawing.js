const mongoose = require('mongoose');

const DrawingSchema = mongoose.Schema({
    info: {
        type: Array,
        default: [],
    },
    name: {
        type: String,
        default: '',
    },
    perim: {
        type: String,
        default: '',
    },
    volume: {
        type: String,
        default: '',
    },
    comment: {
        type: String,
        default: '',
    },
    price: {
        type: String,
        default: '',
    },
    prices: {
        type: Array,
        default: [],
    },
    material: {
        type: String,
        default: '',
    },
    order_id: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Drawing', DrawingSchema);