import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import DataLoader from 'dataloader'

import models, { sequelize } from './models'
import resolvers from './resolvers'
import schema from './schema'
import loaders from './loaders'

const app = express()
app.use(cors())

const getMe = async req => {
  const token = req.headers['x-token']
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }
}

const server = new ApolloServer({
  introspection: true,
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
  context: async ({ req }) => {
    const me = await getMe(req)
    return {
      models,
      me,
      secret: process.env.SECRET,
      loaders: {
        user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
      }
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

const createUsersWithBooks = async date => {
  await models.User.create(
    {
      username: 'spinelli',
      email: 'spinelli@gmail.com',
      password: 'spinellitortellini',
      books: [
        {
          author: 'Vince Lassel',
          createdAt: date.setSeconds(date.getSeconds() + 1),
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
      email: 'vlassel@gmail.com',
      password: 'lasseltassel',
      books: [
        {
          author: 'Ashley Spinelli',
          createdAt: date.setSeconds(date.getSeconds() + 1),
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

const port = process.env.PORT || 8000
const isTest = !!process.env.TEST_DATABASE
const isProduction = !!process.env.DATABASE_URL

sequelize.sync({ force: isTest || isProduction }).then(async () => {
  if (isTest || isProduction) {
    createUsersWithBooks(new Date())
  }

  app.listen({ port }, () => {
    console.log(`Apollo Server on https://localhost:${port}/graphql`)
  })
})
