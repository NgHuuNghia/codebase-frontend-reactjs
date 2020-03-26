import gql from 'graphql-tag'

export const GET_CITY_NODES = gql`
  query getNodeByCategory($category: Category!) {
    getNodeByCategory(category: $category) {
        _id
        name
        parent {
          _id
          name
        }
      }
  }
`
