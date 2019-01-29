import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'

import { isAuthenticated, isBookOwner } from './authorization'

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    myBooks: combineResolvers(
      isAuthenticated,
      async (
        _root,
        { input: { cursor, limit = 10 } },
        { me: { id }, models: { User, Book } }
      ) => {
        const fieldsObj = { userId: id }
        if (cursor) {
          fieldsObj['createdAt'] = { [Sequelize.Op.lt]: fromCursorHash(cursor) }
        }

        const bookCount = await Book.count({ where: { userId: id } })

        const books = await Book.findAll({
          order: [['createdAt', 'DESC']],
          limit: limit + 1,
          where: fieldsObj
        })

        const hasNextPage = books.length > limit
        const edges = hasNextPage ? books.slice(0, -1) : books

        return {
          edges,
          pageInfo: {
            endCursor: toCursorHash(
              edges[edges.length - 1].createdAt.toString()
            ),
            hasNextPage
          },
          bookCount
        }
      }
    ),
    books: async (
      _root,
      { input: { cursor, limit = 50 } },
      { models: { Book } }
    ) => {
      const bookCount = await Book.count()

      const books = await Book.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        where: cursor
          ? { createdAt: { [Sequelize.Op.lt]: fromCursorHash(cursor) } }
          : null
      })

      const hasNextPage = books.length > limit
      const edges = hasNextPage ? books.slice(0, -1) : books

      return {
        edges,
        pageInfo: {
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString()),
          hasNextPage
        },
        bookCount
      }
    },
    book: async (_root, { id }, { models: { Book } }) => await Book.findById(id)
  },

  Mutation: {
    createBook: combineResolvers(
      isAuthenticated,
      async (
        _root,
        {
          input: {
            title,
            author,
            category,
            pages,
            chapters,
            currentPage,
            currentChapter
          }
        },
        { me, models: { Book } }
      ) =>
        await Book.create({
          title,
          author,
          category,
          pages,
          currentPage,
          chapters,
          currentChapter,
          userId: me.id
        })
    ),

    deleteBook: combineResolvers(
      isAuthenticated,
      isBookOwner,
      async (_root, { input: { id } }, { models: { Book } }) =>
        await Book.destroy({ where: { id } })
    ),

    editBook: combineResolvers(
      isAuthenticated,
      async (_root, { input }, { me, models: { Book } }) => {
        const book = await Book.findOne({
          where: { id: input.id, userId: me.id }
        })

        for (const key in input) {
          if (key !== 'id' && !input[key])
            input[key] = book._previousDataValues[key]
        }

        const {
          id,
          title,
          author,
          category,
          currentChapter,
          chapters,
          currentPage,
          pages
        } = input

        return await book.update(
          {
            title,
            author,
            category,
            currentChapter,
            chapters,
            currentPage,
            pages
          },
          { where: { id }, returning: true }
        )
      }
    )
  },

  Book: {
    user: async (book, _args, { loaders: { user }, models: { User } }) =>
      await user.load(book.userId)
  }
}
