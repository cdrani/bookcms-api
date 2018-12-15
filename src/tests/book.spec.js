import { expect } from 'chai'
import * as userApi from './api'

xdescribe('books', () => {
  describe('createBook($input: createBookInput!): Book', () => {
    it('creates a book and returns its fields', async () => {
      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        input: {
          login: 'vince',
          password: 'lassel'
        }
      })

      const expectedResult = {
        data: {
          createBook: {
            title: 'The Great Khan',
            author: 'Simon Watershed',
            category: 'Novel',
            chapters: 15,
            currentChapter: 11,
            currentPage: 210,
            pages: 285
          }
        }
      }

      const result = await userApi.createBook(
        {
          input: {
            title: 'The Great Khan',
            author: 'Simon Watershed',
            category: 'Novel',
            chapters: 15,
            currentChapter: 11,
            currentPage: 210,
            pages: 285
          }
        },
        token
      )

      expect(result.data).to.eql(expectedResult)
    })
  })
})
