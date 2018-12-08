import cors from 'cors'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

const app = express()
app.use(cors())

const schema = gql`
  type Query {
    me: [User!]!
    book: [Books!]!
  }

  type User {
    username: String!
    email: String!
    password: String!
  }

  type Books {
    id: ID!
    author: String!
    title: String!
    currentChapter: Int!
    chapters: Int!
    currentPage: Int!
    pages: Int!
  }
`

const resolvers = {
  Query: {
    me: () => [
      {
        username: 'spinelli',
        email: 'spinell@gmail.com',
        password: 'spinellitortellini'
      },
      {
        username: 'vlassel',
        email: 'spinell@gmail.com',
        password: 'lasseltassel'
      }
    ],
    book: () => [
      {
        author: 'Ashley Spinell',
        title: '4th Grade War Stories',
        currentChapter: 5,
        chapters: 12,
        currentPage: 79,
        pages: 231
      },
      {
        author: 'Vince Lassel',
        title: 'School Legend',
        currentChapter: 8,
        chapters: 15,
        currentPage: 153,
        pages: 275
      }
    ]
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on https://localhost:8000/graphql')
})
