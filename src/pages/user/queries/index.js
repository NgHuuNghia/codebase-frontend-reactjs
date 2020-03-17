import gql from 'graphql-tag'

const GET_USERS = gql`
  query users {
    users {
      _id
      fullName
      username
      idAccount
      createdAt
      updatedAt
    }
  }
`
const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input)
  }
`
const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $input: UpdateUserInput!) {
    updateUser(_id: $_id, input: $input)
  }
`
const DELETE_USER = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id)
  }
`

export { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER }
