import shortid from 'shortid'

export default {
  Query: {
    me: (_, args, { me }) => me,
    user: (_, { id }) => users[id],
    users: (root, _, { models: { users } }) => Object.values(users),
    books: (root, _, { models: { books } }) => Object.values(books),
    book: (_, { models: { books } }) => books[id]
  },
  Mutation: {
    createBook: (
      _,
      {
        input: { title, author, pages, chapters, currentPage, currentChapter }
      },
      { me, users }
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
    deleteBook: (_, { input: { id } }, { me, users }) => {
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
    books: (user, _, { books }) =>
      Object.values(books).filter(book => book.userId === user.id)
  },
  Book: {
    user: (book, _, { users }) => users[book.userId]
  }
}
