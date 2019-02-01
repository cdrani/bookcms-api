import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    books(input: booksInput!): BookConnection!
    book(id: ID!): Book
    myBooks(input: booksInput): BookConnection!
  }

  extend type Mutation {
    createBook(input: createBookInput!): Book
    deleteBook(input: deleteBookInput!): Boolean!
    editBook(input: editBookInput!): Book
    updateBookMark(input: updateBookMarkInput!): Book
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    category: String!
    chapters: Int!
    pages: Int!
    currentChapter: Int
    currentPage: Int
    user: User!
    createdAt: Date!
  }

  type BookConnection {
    edges: [Book!]!
    pageInfo: PageInfo!
    bookCount: Int!
  }

  type PageInfo {
    endCursor: String!
    hasNextPage: Boolean!
  }

  input booksInput {
    cursor: String
    limit: Int
  }

  input deleteBookInput {
    id: ID!
  }

  input createBookInput {
    title: String!
    author: String!
    chapters: Int!
    pages: Int!
    category: String!
  }

  input editBookInput {
    id: ID!
    title: String
    author: String
    chapters: Int
    pages: Int
    category: String
  }

  input updateBookMarkInput {
    id: ID!
    currentChapter: Int
    currentPage: Int
  }
`
