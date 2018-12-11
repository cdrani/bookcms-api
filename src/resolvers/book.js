import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'

import { isAuthenticated, isBookOwner } from './authorization'

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    books: async (
      _root,
      { input: { cursor, limit = 50 } },
      { models: { Book } }
    ) => {
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
        }
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
          input: { title, author, pages, chapters, currentPage, currentChapter }
        },
        { me, models: { Book } }
      ) =>
        await Book.create({
          title,
          author,
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

    updateBookTitle: combineResolvers(
      isAuthenticated,
      isBookOwner,
      async (_root, { input: { id, newTitle } }, { models: { Book } }) => {
        const book = await Book.findById(id)
        return book.update(
          { title: newTitle },
          { where: { id: id }, returning: true }
        )
      }
    )
  },

  Book: {
    user: async (book, _args, { loaders: { user }, models: { User } }) =>
      await user.load(book.userId)
  }
}
