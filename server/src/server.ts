import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql/schema.ts';

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up Apollo Server with Express
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: any) => {
    // Extract token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
        return { user };
      } catch (err) {
        throw new Error('Authentication token is invalid');
      }
    }
    return {};
  },
});

server.start().then(() => {
  // Apply Apollo Server middleware
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT} - GraphQL at /graphql`)
    );
  });
});