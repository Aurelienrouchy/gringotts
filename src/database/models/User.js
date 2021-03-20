const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    photoUrl: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: false,
    },
    provider: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: true,
        default: 0
    },
    trees: {
        type: Number,
        required: true,
        default: 0
    },
    ticketsProgress: {
        type: Number,
        required: true,
        default: 0
    },
    lotos: [{
        id: Number,
        numbers: [Number],
        complementary: [Number],
        createAt: Date
    }]
});

// Model Methods
// UserSchema.methods.generateJWT = (token) => {
//     return jwt.sign({token}, process.env.JWT_KEY || 'Prout123')
// };

const User = model('user', UserSchema); 

module.exports = User;