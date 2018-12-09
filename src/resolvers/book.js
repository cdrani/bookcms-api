import shortid from 'shortid'

export default {
  Query: {
    books: async (_root, _args, { models: { Book } }) => await Book.findAll(),
    book: async (_root, { id }, { models: { Book } }) => await Book.findById(id)
  },

  Mutation: {
    createBook: async (
      _root,
      {
        input: { title, author, pages, chapters, currentPage, currentChapter }
      },
      { models: { Book } }
    ) =>
      await Book.create({
        title,
        author,
        pages,
        currentPage,
        chapters,
        currentChapter,
        userId: me.id
      }),

    deleteBook: async (_root, { input: { id } }, { models: { Book } }) =>
      await Book.destroy({ where: { id } }),

    updateBookTitle: async (
      _,
      { input: { id, newTitle } },
      { models: { Book } }
    ) => await Book.update({ title: newTitle })
  },

  Book: {
    user: async (book, _args, { models: { User } }) =>
      await User.findById(book.userId)
  }
}
