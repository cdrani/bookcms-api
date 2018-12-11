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
