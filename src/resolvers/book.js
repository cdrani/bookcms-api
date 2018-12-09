import shortid from 'shortid'

export default {
  Query: {
    books: (root, _, { models: { books } }) => Object.values(books),
    book: (_, { id }, { models: { books } }) => books[id]
  },
  Mutation: {
    createBook: (
      _,
      {
        input: { title, author, pages, chapters, currentPage, currentChapter }
      },
      { me, models: { users, books } }
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
    deleteBook: (_, { input: { id } }, { me, models }) => {
      const { users, books } = models
      const { [id]: book, ...otherBooks } = books
      if (!book) return false
      models.books = otherBooks
      const bookIndex = users[me.id].bookIds.find(id => id === book.id)
      users[me.id].bookIds.splice(bookIndex, 1)
      return true
    },
    updateBookTitle: (
      _,
      { input: { id, newTitle } },
      { models: { books } }
    ) => {
      const { [id]: book, ...otherBooks } = books
      book.title = newTitle
      return books[id]
    }
  },
  Book: {
    user: (book, _, { models: { users } }) => users[book.userId]
  }
}
