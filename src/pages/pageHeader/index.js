/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { Navbar, Avatar, Icon } from '@digihcs/innos-ui3'
import { withRouter } from 'react-router-dom'
import avatar from '../../assets/images/avatar.png'
import logo from '../../assets/images/logo.png'

function index(props) {
  const { history, toggleMenu } = props

  return (
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
      <Navbar>
        <Navbar.NavLeft>
          <Avatar src={avatar} onClick={() => toggleMenu()} />
          <Icon
            type="chevron-left"
            style={{ color: '#fff' }}
            onClick={() => history.goBack()}
          />
          <Icon
            type="home"
            style={{ color: '#fff' }}
            onClick={() => history.push('/home')}
          />
          <div>
            <img
              onClick={() => history.push('/home')}
              src={logo}
              alt="logo"
              style={{
                marginTop: 5,
                width: '30%',
                height: '20%',
                cursor: 'pointer'
              }}
            />
          </div>
        </Navbar.NavLeft>
      </Navbar>
    </div>
  )
}

export default withRouter(index)
