/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { Navbar, Avatar, Icon, Select, Option } from '@digihcs/innos-ui3'
import { withRouter } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import Loading from '@components/loading'
import avatar from '../../assets/images/avatar.png'
import logo from '../../assets/images/logo.png'
import { GET_CITY_NODES } from './queries/index'

function index(props) {
  const { history, toggleMenu, childrenProps } = props
  const { data: getNodeByCategory, loading } = useQuery(GET_CITY_NODES, {
    variables: { category: "CITY" },
    fetchPolicy: 'network-only'
  })
  if (loading) return <Loading />

  const handleChangeNode = (idNode) => {
    window.localStorage.setItem('current-node', idNode)
  }

  const currentRoute = childrenProps.props.location.pathname
  return getNodeByCategory?.getNodeByCategory && (
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
        <Navbar.NavCenter>
          <Select style={{ width: '20vw' }} onChange={(value) => handleChangeNode(value)} defaultValue={window.localStorage.getItem('current-node') ? window.localStorage.getItem('current-node') : `${getNodeByCategory?.getNodeByCategory[0]?.name}`}>
            {
              currentRoute === '/home' ? getNodeByCategory.getNodeByCategory.map((node) => {
                return (
                  <Option key={node._id} value={node._id}>{`${node.name}`}</Option>
                )
              }) : getNodeByCategory.getNodeByCategory.filter(node => node._id === window.localStorage.getItem('current-node')).map((node) => {
                return (
                  <Option key={node._id} value={node._id}>{`${node.name}`}</Option>
                )
              })
            }
          </Select>
        </Navbar.NavCenter>
      </Navbar>
    </div>
  )
}

export default withRouter(index)
