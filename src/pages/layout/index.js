/* eslint-disable operator-linebreak */
import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { MenuBurger, Button } from '@digihcs/innos-ui3'
import '@digihcs/innos-ui3/es/menu-burger/style'
import gql from 'graphql-tag'
import PageHeader from '@pages/pageHeader'
import Background from '../../assets/images/background.png'
import avatar from '../../assets/images/avatar.png'

const GET_CURRENT_USER = gql`
  query me {
    me {
      _id
      fullName
    }
  }
`

function index(props) {
  const [isOpenL, setIsOpenL] = useState(false)
  const client = useApolloClient()

  const { children, history, onLogout } = props

  const { data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network'
  })

  function toggleMenu() {
    setIsOpenL(!isOpenL)
  }

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <PageHeader
        history={history}
        toggleMenu={toggleMenu}
        childrenProps={children}
      />
      <>
        <MenuBurger
          nodeLeft={{
            menuNode: (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gridColumnGap: 10
                }}
              >
                <Button style={{ backgroundColor: 'darkcyan' }}>
                  Đổi mật khẩu
                </Button>
              </div>
            ),
            isOpen: isOpenL,
            onStateChange: isOpen => setIsOpenL(isOpen),
            type: 'push',
            content: {
              avatar,
              fullname: data ? data.me.fullName : 'No name',
              logOutText: 'Logout',
              onLogOut: () => {
                onLogout()
                client.resetStore()
                history.push('/login')
              }
            }
          }}
        >
          {React.cloneElement(children, {
            me: data ? data.me : {}
          })}
        </MenuBurger>
      </>
    </div>
  )
}

export default index
