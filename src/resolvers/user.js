export default {
  Query: {
    users: async (_root, _args, { models: { User } }) => await User.findAll(),
    user: async (_root, { id }, { models: { User } }) =>
      await User.findById(id),
    me: async (_root, _args, { me: { id }, models: { User } }) =>
      await User.findById(id)
  },
  Mutation: {
    signUp: async (
      _root,
      { input: { username, email, password } },
      { models: { User } }
    ) => {
      const user = await User.create({ username, email, password })
      return { token: createToken(user)}
    }
  },
  User: {
    username: async user => await user.username.toLowerCase(),
    books: async (user, _args, { models: { Book } }) =>
      await Book.findAll({ where: { userId: user.id } })
  }
}
