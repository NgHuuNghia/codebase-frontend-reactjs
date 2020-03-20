/* eslint-disable no-nested-ternary */
import React from 'react'
import { Provider, Dashboard } from '@digihcs/dashboard'
import { menuRoutes } from '@configs'
import { withQuery } from '@utils'

function index({ data: { getRole }, ...props }) {
  const { history } = props
  const menuData = [
    {
      title: 'Dashboard',
      type: 'navigation',
      childs: menuRoutes && getRole && menuRoutes.filter(item1 => item1.requiredRoles.includes(getRole))
    }
  ]

  return (
    <Provider>
      <div style={{ height: '100%' }}>
        <Dashboard
          configurations={{ history }}
          isInEditMode={false}
          data={menuData}
        />
      </div>
    </Provider>
  )
}

export default withQuery(index)(
  {
    query: `
      query getRole ($token: String!) {
        getRole(token: $token)
      }
    `,
    options: () => {
      const token = window.localStorage.getItem('access-token') || ''
      return {
        variables: {
          token
        },
        fetchPolicy: 'no-cache'
      }
    }
  }
)
