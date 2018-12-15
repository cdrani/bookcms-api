import axios from 'axios'

const API_URL = 'http://localhost:8000/graphql'

export const user = async variables =>
  axios.post(API_URL, {
    query: `
     query ($id: ID!) {
       user(id: $id) {
         id
         username
         email
       }
     } 
    `,
    variables
  })

export const signUp = async variables =>
  axios.post(API_URL, {
    query: `
      mutation($input: signUpInput!) {
        signUp(input: $input) {
          token
        }
      }
    `,
    variables
  })

export const signIn = async variables =>
  axios.post(API_URL, {
    query: `
      mutation($input: signInInput!) {
        signIn(input: $input) {
          token
        }
      }
    `,
    variables
  })

export const deleteMyAccount = async token =>
  axios.post(
    API_URL,
    {
      query: `
        mutation {
          deleteMyAccount
        } 
      `
    },
    { headers: { 'x-token': token } }
  )

export const createBook = async (variables, token) => {
  console.log(variables, token)
  return axios.post(
    API_URL,
    {
      query: `
        mutation($input: createBookInput!) {
          createBook(input: $input) {
            title
            author
            category
            currentPage
            pages
            chapter
            currentChapter
          }
        }
      `,
      variables
    },
    { headers: { 'x-token': token } }
  )
}
