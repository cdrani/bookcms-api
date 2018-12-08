import cors from 'cors'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import shortid from 'shortid'

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

let users = {
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

let books = {
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
    me: (_, args, { me }) => me,
    user: (_, { id }) => users[id],
    users: () => Object.values(users),
    books: () => Object.values(books),
    book: (_, { id }) => books[id]
  },
  Mutation: {
    createBook: (
      _,
      {
        input: { title, author, pages, chapters, currentPage, currentChapter }
      },
      { me }
    ) => {
      const id = shortid.generate()
      const book = {
        id,
        title,
        author,
        pages,
        currentPage,
        chapters,
        currentChapter,
        userId: me.id
      }

      books[id] = book
      users[me.id].bookIds.push(id)

      return book
    },
    deleteBook: (_, { input: { id } }, { me }) => {
      const { [id]: book, ...otherBooks } = books
      if (!book) return false
      books = otherBooks
      const bookIndex = users[me.id].bookIds.find(id => id === book.id)
      users[me.id].bookIds.splice(bookIndex, 1)
      return true
    },
    updateBookTitle: (_, { input: { id, newTitle } }) => {
      const { [id]: book, ...otherBooks } = books
      book.title = newTitle
      return books[id]
    }
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
