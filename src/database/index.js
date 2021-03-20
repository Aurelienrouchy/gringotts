const { connect, connection, set } = require('mongoose');
set('useFindAndModify', false);

const url = 'mongodb+srv://aurelien:Prout123.!@cluster0.uw8ar.mongodb.net/lkd?retryWrites=true&w=majority';

connect(
    url, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    }
);

connection.once('open', () => console.log(`Connected to mongo at ${url}`));