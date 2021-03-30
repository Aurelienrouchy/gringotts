const User = require('./models/User');
const jwt =  require('jsonwebtoken');

const getUserWithToken = async (token) => {
    let tk;
    if (token.startsWith('Bearer ')) {
        tk = token.slice(7, token.length).trimLeft();
    }
    const tokenDecoded = jwt.verify(tk, process.env.JWT_KEY || 'Prout123');
    return await User.findById(tokenDecoded.token);
};

module.exports = { 
    getUserWithToken
};