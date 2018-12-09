export default {
  Query: {
    users: (root, _, { models: { users } }) => Object.values(users),
    user: (_, { id }, { models: { users } }) => users[id],
    me: (_, args, { me }) => me
  },
  User: {
    username: user => user.username.toLowerCase(),
    books: (user, _, { models: { books } }) =>
      Object.values(books).filter(book => book.userId === user.id)
  }
}
