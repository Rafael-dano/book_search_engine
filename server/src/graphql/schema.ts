import { gql } from 'apollo-server-express';

// Define types
export const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    getBooks: [Book]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

export const resolvers = {
    Query: {
      getBooks: async () => {
        // Fetch books from your MongoDB (or wherever your data is stored)
        return [{ title: '1984', author: 'George Orwell' }];
      },
    },
    Mutation: {
      addBook: async (_parent: any, args: { title: string, author: string }) => {
        // Add a new book to your MongoDB
        return { title: args.title, author: args.author };
      },
    },
  };
  