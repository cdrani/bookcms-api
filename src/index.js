import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import models, { sequelize } from './models'
import resolvers from './resolvers'
import schema from './schema'

const app = express()
app.use(cors())

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')

    return {
      ...error,
      message
    }
  },
  context: async () => ({ models, me: models.User.findByLogin('spinelli') })
})

server.applyMiddleware({ app, path: '/graphql' })

const eraseDatabaseOnSync = true

const createUsersWithBooks = async () => {
  await models.User.create(
    {
      username: 'spinelli',
      email: 'spinelli@gmail.com',
      password: 'spinellitortellini',
      books: [
        {
          author: 'Vince Lassel',
          title: 'Vicenzo',
          currentChapter: 8,
          chapters: 15,
          currentPage: 153,
          pages: 315
        }
      ]
    },
    { include: [models.Book] }
  )

  await models.User.create(
    {
      username: 'vlassel',
      email: 'vlasses@gmail.com',
      password: 'lasseltassel',
      books: [
        {
          author: 'Ashley Spinelli',
          title: 'Spin Cycle',
          currentChapter: 9,
          chapters: 12,
          currentPage: 210,
          pages: 275
        }
      ]
    },
    { include: [models.Book] }
  )
}

// remove force option prior to deploy
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithBooks()
  }

  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on https://localhost:8000/graphql')
  })
})
