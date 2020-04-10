import gql from 'graphql-tag'

const SUBCRIPTIONS_CREATE_MESSAGE = gql`
  subscription messageCreated($idNode: String!){
    messageCreated (idNode: $idNode) {
        _id
        content
        isActive
        createdAt
    }
  }
`
export { SUBCRIPTIONS_CREATE_MESSAGE }
