import cors from 'cors'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

const app = express()
app.use(cors())

const schema = gql`
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
`

const users = {
  sdjlafjsd: {
    id: 'sdjlafjsd',
    username: 'spinelli',
    email: 'spinell@gmail.com',
    password: 'spinellitortellini',
    bookIds: ['woeurweq']
  },
  ldsjafjls: {
    id: 'ldsjafjls',
    username: 'vlassel',
    email: 'vlassel@gmail.com',
    password: 'lasseltassel',
    bookIds: ['sjcnvkjlj']
  }
}

const books = {
  woeurweq: {
    id: 'woeurweq',
    userId: 'sdjlafjsd',
    author: 'Ashley Spinell',
    title: '4th Grade War Stories',
    currentChapter: 5,
    chapters: 12,
    currentPage: 79,
    pages: 231
  },
  sjcnvkjlj: {
    id: 'sjcnvkjlj',
    userId: 'ldsjafjls',
    author: 'Vince Lassel',
    title: 'School Legend',
    currentChapter: 8,
    chapters: 15,
    currentPage: 153,
    pages: 275
  }
}

const resolvers = {
  Query: {
    me: (parent, args, ctx) => ctx.me,
    user: (parent, args) => users[args.id],
    users: () => Object.values(users),
    books: () => Object.values(books),
    book: (parent, args) => books[args.id]
  },
  User: {
    username: user => user.username.toLowerCase(),
    books: user => Object.values(books).filter(book => book.userId === user.id)
  },
  Book: {
    user: (book, args, ctx) => users[book.userId]
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: { me: users['ldsjafjls'] }
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on https://localhost:8000/graphql')
})
