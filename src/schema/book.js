import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    books(input: booksInput): BookConnection!
    book(id: ID!): Book
    myBooks(input: booksInput): BookConnection!
  }

  extend type Mutation {
    createBook(input: createBookInput!): Book
    deleteBook(input: deleteBookInput!): Boolean!
    updateBookTitle(input: UpdateBookTitleInput!): Book
  }

  type Book {
    id: ID!
    author: String!
    category: String!
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
    category: String!
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
