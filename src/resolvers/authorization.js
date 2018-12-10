import { ForbiddenError } from 'apollo-server'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (_root, _args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.')
