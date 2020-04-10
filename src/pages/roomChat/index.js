import React, { useState, useRef, useEffect } from 'react'
import { useSubscription } from 'react-apollo'
import { Row, Col, Avatar, Input, Icon, notification } from '@digihcs/innos-ui3'
import moment from 'moment'
import { withApollo } from '@utils'
import { SUBCRIPTIONS_CREATE_MESSAGE } from './queries'
import './index.scss'

const RoomChat = ({ data: { refetch, messagesByNode }, mutation: { createMessage } }) => {
  const { error, data } = useSubscription(SUBCRIPTIONS_CREATE_MESSAGE, {
    variables: {
      idNode: window.localStorage.getItem('current-node') || ''
    }
  })
  const [messageText, setMessageText] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTo({
      top: document.body.scrollHeight + 10000,
      // behavior: 'smooth'
    })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messagesByNode])

  if (error) {
    console.log(error)
  }

  if (data?.messageCreated) {
    refetch()
  }
  const sendMessageHandle = () => {
    createMessage({
      variables: {
        content: messageText,
        idNode: window.localStorage.getItem('current-node') || ''
      }
    }).then(res => {
      if (res.errors) {
        notification.bar({
          type: 'error',
          content: res.errors.message,
          placement: 'bottomRight',
          theme: 'pharmacy'
        })
      } else {
        setMessageText('')
      }
    })
  }
  return (
    <div>
      <Row hSpacing={0}>
        <Col>
          <div style={{ width: '20vw', height: '100vh', background: '#222' }}>
            <div>
              list member
            </div>
          </div>
        </Col>
        <Col span='XL6 L6 M6 S6'>
          <div className='container-chat' style={{ width: '80vw', height: '100vh', background: '#fff', border: '2px solid #222', }}>
            <div className='content-chat' ref={messagesEndRef} style={{ height: '80vh', padding: '1rem', overflow: 'auto' }}>
              {
                messagesByNode && messagesByNode.map((message, index) => {
                  return (
                    <div className='message' key={index} style={{ marginBottom: '1rem' }}>
                      <Avatar
                        iconName='employee'
                        size={40}
                        shape='square'
                        style={{ marginTop: '1rem' }}
                      />
                      <div className='box-chat' style={{ display: 'inline-grid', marginLeft: 5 }}>
                        <div>
                          <span style={{ fontWeight: 'bold' }}> {message.userName}</span>
                          <span style={{ color: '#9E9E9E' }}>  {moment.unix(message.createdAt / 1000).format("hh:mm A DD/MM/YYYY")}</span>
                        </div>
                        <div style={{ color: '#444' }}>
                          {message.content}
                        </div>
                      </div>
                    </div>

                  )
                })
              }
            </div>
            <div className='form-chat' style={{ height: '20vh', background: 'white', padding: '1.5rem' }}>
              <Input
                style={{ width: '100%' }}
                placeholder='Message'
                suffix={(
                  <Icon type='send' style={{ cursor: 'pointer' }} onClick={sendMessageHandle} />
                )}
                value={messageText}
                onChange={(e) => { setMessageText(e.target.value) }}
                onPressEnter={sendMessageHandle}
              />
            </div>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default withApollo(RoomChat)([
  {
    query: `
        query messagesByNode($idNode: String!) {
          messagesByNode(idNode: $idNode) {
            _id
            content
            idNode
            userName
            idUser
            createdAt
            updatedAt
          }
        }
    `,
    options: () => {
      const idNode = window.localStorage.getItem('current-node')
      return {
        variables: {
          idNode
        },
        fetchPolicy: 'no-cache'
      }
    }
  },
  {

    mutation: `
      mutation createMessage ($content: String!, $idNode: String!) {
        createMessage(content: $content, idNode: $idNode) {
          _id
          idNode
          content
          idNode
          idUser
          isActive
        }
      }
    `,
    name: 'createMessage'
  }
])
