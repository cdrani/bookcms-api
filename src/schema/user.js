import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(input: signUpInput!): Token!
  }

  type User {
    id: ID!
    books: [Book!]
    username: String!
    email: String!
  }

  type Token {
    token: String!
  }

  input signUpInput {
    username: String!
    email: String!
    password: String!
  }
`
