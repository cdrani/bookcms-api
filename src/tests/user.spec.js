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
  })
})
