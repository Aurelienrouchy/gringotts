const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TicketSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    level: {
        type: Number,
        required: true,
    },
    minCoins: {
        type: Number,
        required: true,
    },
    maxCoins: {
        type: Number,
        required: true,
    },
    scratchableBeforeUnlock: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
    },
    imageFrontUrl: {
        type: String,
        required: true,
        trim: true,
    },
    imageBackUrl: {
        type: String,
        required: true,
        trim: true,
    },
    progressColor: {
        type: String,
        required: true,
        trim: true,
    }
});

const Ticket = model('ticket', TicketSchema); 

module.exports = Ticket;