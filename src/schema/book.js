import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    books: [Book!]
    book(id: ID!): Book
  }

  extend type Mutation {
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

  type Book {
    id: ID!
    author: String!
    chapters: Int!
    currentChapter: Int!
    currentPage: Int!
    createdAt: Date!
    pages: Int!
    title: String!
    user: User!
  }
`
