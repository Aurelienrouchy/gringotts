const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const LotoTicketSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    lotoId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    classic: {
        type: [ Number ],
        required: true
    },
    complementary: {
        type: [ Number ],
        required: true
    },
});

const LotoTicket = model('lotoTicket', LotoTicketSchema); 

module.exports = LotoTicket;