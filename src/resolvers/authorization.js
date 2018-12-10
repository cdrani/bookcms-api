import { ForbiddenError } from 'apollo-server'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (_root, _args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.')

export const isBookOwner = async (_root, { id }, { me, models: { Book } }) => {
  const book = await Book.findById(id, { raw: true })
  if (book.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }
  return skip
}
