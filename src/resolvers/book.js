import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isBookOwner } from './authorization'

export default {
  Query: {
    books: async (_root, _args, { models: { Book } }) => await Book.findAll(),
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
      isBookOwner,
      async (_root, { input: { id } }, { models: { Book } }) =>
        await Book.destroy({ where: { id } })
    ),

    updateBookTitle: combineResolvers(
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
    user: async (book, _args, { models: { User } }) =>
      await User.findById(book.userId)
  }
}
