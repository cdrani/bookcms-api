import { expect } from 'chai'
import * as userApi from './api'

describe('users', () => {
  describe('user($id: String!): User', () => {
    it('returns a user when a user is found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '1',
            username: 'spinelli',
            email: 'spinelli@gmail.com'
          }
        }
      }
      const result = await userApi.user({ id: '1' })
      expect(result.data).to.eql(expectedResult)
    })

    it('returns null when user not found', async () => {
      const expectedResult = {
        data: { user: null }
      }

      const result = await userApi.user({ id: '7843' })
      expect(result.data).to.eql(expectedResult)
    })
  })

  describe('deleteMyAccount: Boolean!', () => {
    it('returns true if authenticated user deleted', async () => {
      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        input: {
          login: 'spinelli',
          password: 'spinellitortellini'
        }
      })

      const {
        data: {
          data: { deleteMyAccount }
        }
      } = await userApi.deleteMyAccount(token)
      expect(deleteMyAccount).to.eql(true)
    })
  })
})
