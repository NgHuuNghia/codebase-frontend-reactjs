import gql from 'graphql-tag'

const GET_SHOPS = gql`
  query shops {
    shops {
      _id
      name
      isActive
      createdAt
      updatedAt
    }
  }
`

const GET_SHOP = gql`
  query shop($_id: ID!) {
    shop(_id: $_id) {
      _id
      name
      isActive
      createdAt
      updatedAt
    }
  }
`

const CREATE_SHOP = gql`
  mutation createShop($shopName: CreateShopInput!) {
    createShop(shopName: $shopName) {
      _id
      name
      isActive
      createdAt
      updatedAt
    }
  }
`

const UPDATE_SHOP = gql`
  mutation updateShop($_id: ID!, $name: String!) {
    updateShop(_id: $_id, name: $name) {
      _id
      name
      isActive
      createdAt
      updatedAt
    }
  }
`

const DELETE_SHOP = gql`
  mutation deleteShop($_id: ID!) {
    deleteShop(_id: $_id) {
      _id
      name
      isActive
      createdAt
      updatedAt
    }
  }
`

export { GET_SHOPS, GET_SHOP, CREATE_SHOP, UPDATE_SHOP, DELETE_SHOP }
