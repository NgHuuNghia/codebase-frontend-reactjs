import gql from 'graphql-tag'

const GET_ROLES = gql`
  query roles {
    roles {
      _id
      code
      description
      permissions
      isActive
      createdAt
      updatedAt
    }
  }
`
const CREATE_ROLE = gql`
  mutation createRole($input: CreateRoleInput!) {
    createRole(input: $input) {
      _id
      code
      description
      permissions
    }
  }
`
const UPDATE_ROLE = gql`
  mutation updateRole($_id: ID!, $input: UpdateRoleInput!) {
    updateRole(_id: $_id, input: $input) {
      _id
      code
      description
      permissions
    }
  }
`

const DELETE_ROLE = gql`
  mutation deleteRole($_id: ID!) {
    deleteRole(_id: $_id)
  }
`

const GET_PERMISSIONS = gql`
  query permissions {
    permissions {
      _id
      code
      description
    }
  }
`
export { GET_ROLES, UPDATE_ROLE, DELETE_ROLE, CREATE_ROLE, GET_PERMISSIONS }
