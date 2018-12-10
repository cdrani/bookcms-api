import { GraphQLDateTime } from 'graphql-iso-date'

import userResolvers from './user'
import bookResolvers from './book'

const customeScalarResolver = {
  Date: GraphQLDateTime
}

export default [customeScalarResolver, userResolvers, bookResolvers]
