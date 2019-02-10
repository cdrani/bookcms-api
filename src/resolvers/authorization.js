import { ForbiddenError } from 'apollo-server'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (_root, _args, { user }) =>
  user ? skip : new ForbiddenError('Not authenticated as user.')

export const isBookOwner = async (
  _root,
  { input: { id } },
  { user, models: { Book } }
) => {
  const book = await Book.findById(id, { raw: true })
  if (book.userId !== user.id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }
  return skip
}
