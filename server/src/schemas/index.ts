// server/src/schemas/index.ts
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Book {
    _id: ID!
    title: String!
    author: String!
    description: String
  }

  type Query {
    getBooks: [Book]
    getUserBooks(userId: ID!): [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!, description: String): Book
    deleteBook(bookId: ID!): Book
  }
`;

export const resolvers = {
  Query: {
    getBooks: () => {
      // Query logic to fetch all books (for now, just return dummy data)
      return [
        { _id: "1", title: "1984", author: "George Orwell", description: "A dystopian novel" },
        { _id: "2", title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A novel set in the Jazz Age" },
      ];
    },
    getUserBooks: (_: any, { userId }: { userId: string }) => {
      // Query logic to fetch books for a specific user by userId
      return []; // This can be modified to return user-specific data.
    },
  },
  Mutation: {
    addBook: (_: any, { title, author, description }: { title: string, author: string, description: string }) => {
      // Mutation to add a book to the database (replace with MongoDB code)
      const newBook = { _id: Date.now().toString(), title, author, description };
      return newBook; // Return the newly created book
    },
    deleteBook: (_: any, { bookId }: { bookId: string }) => {
      // Mutation to delete a book by its ID
      return { _id: bookId, title: "Mock Title", author: "Mock Author", description: "Mock Description" }; // Return the deleted book info
    },
  },
};
