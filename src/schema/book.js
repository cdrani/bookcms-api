import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    books(input: booksInput): BookConnection!
    book(id: ID!): Book
  }

  extend type Mutation {
    createBook(input: createBookInput!): Book
    deleteBook(input: deleteBookInput!): Boolean!
    updateBookTitle(input: UpdateBookTitleInput!): Book
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

  type BookConnection {
    edges: [Book!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    endCursor: Date!
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
