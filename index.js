const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors')
require('./src/database');

const app = express();

app.use(cors())

const typeDefs = require('./src/typeDefs.js');
const resolvers = require('./src/resolvers.js');

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({
  app
})

app.listen(
  {
    port: 4003
  },
  (t) => console.log(`🚀  Server ready at ${t}`)
)

  