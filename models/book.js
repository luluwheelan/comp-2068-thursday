const mongoose = require('mongoose');


//Our Schema - book model
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['Yes', 'Not'],
        default: 'Have'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);