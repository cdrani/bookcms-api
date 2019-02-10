import { AuthenticationError, UserInputError } from 'apollo-server'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from './authorization'
import { createTokens } from '../auth'

export default {
  Query: {
    users: async (_root, _args, { models: { User } }) => await User.findAll(),
    user: async (_root, { id }, { models: { User } }) =>
      await User.findById(id),
    me: async (_root, _args, { user: { id }, models: { User } }) =>
      await User.findById(id)
  },
  Mutation: {
    signUp: async (
      _root,
      { input: { username, email, password } },
      { secret, refreshSecret, models: { User } }
    ) => {
      const user = await User.create({ username, email, password })

      const [token, refreshToken] = await createTokens(
        user,
        secret,
        refreshSecret
      )

      return { token, refreshToken }
    },
    signIn: async (
      _root,
      { input: { login, password } },
      { secret, refreshSecret, models: { User } }
    ) => {
      const user = await User.findByLogin(login)
      if (!user) {
        throw new UserInputError('No user found with this login credentials.')
      }

      const isValid = await user.validatePassword(password)

      if (!isValid) {
        throw new AuthenticationError('Invalid password')
      }

      const [token, refreshToken] = await createTokens(
        user,
        secret,
        refreshSecret
      )

      return { token, refreshToken }
    },
    deleteMyAccount: combineResolvers(
      isAuthenticated,
      async (_root, _args, { user: { id }, models: { User } }) =>
        await User.destroy({ where: { id } })
    )
  },
  User: {
    username: async user => await user.username.toLowerCase(),
    books: async (user, _args, { models: { Book } }) =>
      await Book.findAll({ where: { userId: user.id } })
  }
}
