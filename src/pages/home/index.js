/* eslint-disable no-nested-ternary */
import React from 'react'
import { Provider, Dashboard } from '@digihcs/dashboard'
import { menuRoutes } from '@configs'

function index(props) {
  const { history } = props

  const menuData = [
    {
      title: 'Dashboard',
      type: 'navigation',
      childs: menuRoutes
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

export default index
