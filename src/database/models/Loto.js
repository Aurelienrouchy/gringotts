const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const LotoSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    cost: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
    },
    lotoNumbers: {
        type: Number,
        required: true,
    },
    lotoComplementary: {
        type: Number,
        required: true,
    },
    maxNumbers: {
        type: Number,
        required: true,
    },
    maxComplementary: {
        type: Number,
        required: true,
    },
    winner: {
        type: Schema.Types.ObjectId,
        default: null
    },
    tickets: {
        type: [ Schema.Types.ObjectId ],
        default: []
    }
});

const Loto = model('loto', LotoSchema); 

module.exports = Loto;