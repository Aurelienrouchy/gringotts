const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { getUserWithToken } = require('./src/database/utils');
const cors = require('cors')
require('./src/database');

const app = express();

app.use(cors())

const typeDefs = require('./src/typeDefs.js');
const resolvers = require('./src/resolvers.js');

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
		const token = req.headers.authorization || '';		
		const user = token && await getUserWithToken(token);
		return { user, req, res }
	},
});

server.applyMiddleware({
    app
})

app.listen(
    {
        port: process.env.PORT || 3000
    },
    (t) => console.log(`🚀  Server ready at ${t}`)
)

  