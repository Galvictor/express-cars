const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    modelo: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    ano: {
        type: Number,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Cars', carsSchema);
