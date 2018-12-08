import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
    books: [Book!]
    book(id: ID!): Book
  }

  type User {
    id: ID!
    books: [Book!]
    username: String!
    email: String!
    password: String!
  }

  type Book {
    id: ID!
    author: String!
    title: String!
    currentChapter: Int!
    chapters: Int!
    currentPage: Int!
    pages: Int!
    user: User!
  }

  type Mutation {
    createBook(input: createBookInput!): Book
    deleteBook(input: deleteBookInput!): Boolean!
    updateBookTitle(input: UpdateBookTitleInput!): Book
  }

  input deleteBookInput {
    id: ID!
  }

  input createBookInput {
    title: String!
    author: String!
    currentChapter: Int!
    chapters: Int!
    currentPage: Int!
    pages: Int!
  }

  input UpdateBookTitleInput {
    id: ID!
    newTitle: String!
  }
`
