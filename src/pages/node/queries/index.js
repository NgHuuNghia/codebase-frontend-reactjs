import gql from 'graphql-tag'

const GET_ALL_NODES = gql`
  query nodes{
      nodes {
        _id
        name
        category
      }
  }
`


const CREATE_NODE = gql`mutation createNode($input: NodeInput!){
  createNode(input: $input){
    _id
    name
    category
    idParent
  }
}`

const UPDATE_NODE = gql`mutation updateNode($_id: ID!, $input: NodeInput!){
  updateNode(_id: $_id, input: $input){
    _id
     name
     category
     idParent
  }
}`

export { CREATE_NODE, UPDATE_NODE, GET_ALL_NODES }
