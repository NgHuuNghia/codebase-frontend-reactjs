import gql from 'graphql-tag'

const GET_DISHES_BY_SHOP = gql`
  query dishesByShop ($ID: ID!) {
    dishesByShop(idShop:$ID){
      _id
      name
      updatedAt
      createdAt
    }
  }
`
const CREATE_DISH = gql`
  mutation createDish ($name: String!, $idShop: ID!) {
      createDish(name: $name,idShop: $idShop){
      _id
      name
      idShop
      updatedAt
      createdAt
    }
  }
`
const UPDATE_DISH = gql`
  mutation updateDish ($id: ID!, $name: String!) {
      updateDish(id: $id,name: $name){
      _id
      name
      idShop
      updatedAt
      createdAt
    }
  }
`
const DELETE_DISHES = gql`
  mutation deleteDishes ($ids: [ID!]) {
    deleteDishes(ids: $ids)
  }
`
export { GET_DISHES_BY_SHOP, CREATE_DISH, UPDATE_DISH, DELETE_DISHES }
