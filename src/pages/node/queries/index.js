import gql from 'graphql-tag'


export const CREATE_NODE = gql`mutation createNode($input: NodeInput!){
  createNode(input: $input){
    _id
    name
    category
    parent{
     _id
     name
     category
   }
  }
}`

export const UPDATE_NODE = gql`mutation updateNode($_id: ID!, $input: NodeInput!){
  updateNode(_id: $_id, input: $input){
    _id
    parent{
     _id
     name
     category
     createdAt
     updatedAt
   }
     name
     category
     createdAt
     updatedAt
  }
}`
