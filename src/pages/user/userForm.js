import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { Form, Input, Drawer, notification } from '@digihcs/innos-ui3'

import { CREATE_USER, UPDATE_USER } from './queries'

const userForm = Form.create({ name: 'user_form' })(props => {
  const { form, initialUser, hide, visible, refetchUsers } = props
  const {
    resetFields,
    validateFields,
    getFieldDecorator,
    getFieldsError,
    getFieldValue
  } = form

  const { _id, username, fullName } = initialUser

  const [confirmDirty, setConfirmDirty] = useState(false)

  const [createUser] = useMutation(CREATE_USER)
  const [updateUser] = useMutation(UPDATE_USER)

  function handleConfirmBlur(e) {
    const { value } = e.target
    setConfirmDirty(confirmDirty || !!value)
  }
  function compareToFirstPassword(rule, value, callback) {
    if (value && value !== getFieldValue('password')) {
      callback('inconsistentPassword')
    } else {
      callback()
    }
  }
  function validateToNextPassword(rule, value, callback) {
    if (value && confirmDirty) {
      validateFields(['confirm'], { force: true })
    }
    callback()
  }
  const handleSubmit = () => {
    validateFields((err, values) => {
      if (!err) {
        const { usernameInput, fullName, password } = values
        initialUser._id
          ? updateUser({
              variables: {
                _id,
                input: {
                  password,
                  fullName
                }
              }
            })
              .then(res => {
                if (res.errors) {
                  notification.bar({
                    title: 'Create user failed!',
                    type: 'error',
                    content: res.errors.message,
                    placement: 'bottomRight',
                    theme: 'pharmacy'
                  })
                } else {
                  refetchUsers()
                  resetFields()
                  hide()
                  notification.bar({
                    title: 'Update user success',
                    type: 'success',
                    placement: 'bottomRight',
                    theme: 'pharmacy'
                  })
                }
              })
              .catch(error => {
                console.log(error)
                notification.bar({
                  title: 'Update user failed!',
                  type: 'error',
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              })
          : createUser({
              variables: {
                input: {
                  username: usernameInput,
                  password,
                  fullName
                }
              }
            })
              .then(res => {
                if (res.errors) {
                  notification.bar({
                    title: 'Create user failed!',
                    type: 'error',
                    content: res.errors.message,
                    placement: 'bottomRight',
                    theme: 'pharmacy'
                  })
                } else {
                  refetchUsers()
                  resetFields()
                  hide()
                  notification.bar({
                    title: 'Create user success',
                    type: 'success',
                    placement: 'bottomRight',
                    theme: 'pharmacy'
                  })
                }
              })
              .catch(err => {
                console.log(err)
                notification.bar({
                  title: 'Create user failed!',
                  type: 'error',
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              })
      }
    })
  }
  return (
    <Drawer
      open={visible}
      showFooter
      fieldsError={getFieldsError()}
      onOk={handleSubmit}
      onCancel={() => {
        hide()
        resetFields()
      }}
    >
      <h2 style={{ borderBottom: '1px solid #ccc', padding: 10, margin: 0 }}>
        {_id ? 'Update Account' : 'Create Account'}
      </h2>
      <Form style={{ marginTop: 20 }}>
        <Form.Item label="Username">
          {getFieldDecorator('usernameInput', {
            initialValue: username ? username : '',
            rules: [
              {
                required: initialUser.username ? false : true,
                messages: 'Please input username'
              },
              {
                pattern: /^[^\s]/,
                message: 'Không được có dấu cách đầu dòng'
              }
            ]
          })(
            <Input
              disabled={initialUser.username ? true : false}
              autoComplete={initialUser.username && 'off'}
              placeholder="Input username"
            />
          )}
        </Form.Item>
        <Form.Item label="Full Name">
          {getFieldDecorator('fullName', {
            initialValue: _id ? fullName : ''
          })(<Input placeholder="Input full name" />)}
        </Form.Item>
        <Form.Item
          style={{ display: `${!_id && username ? 'none' : ''}` }}
          label="Password"
        >
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [
              {
                required: initialUser.username ? false : true,
                messages: 'Please input password'
              },
              {
                validator: validateToNextPassword
              }
            ]
          })(
            <Input.Password
              // visibilityToggle={false}
              autoComplete={initialUser.username && 'off'}
              placeholder="Input password"
            />
          )}
        </Form.Item>
        <Form.Item
          style={{ display: `${!_id && username ? 'none' : ''}` }}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: initialUser.username ? false : true,
                messages: 'Please confirm password'
              },
              { validator: compareToFirstPassword }
            ]
          })(
            <Input.Password
              // visibilityToggle={false}
              autoComplete={initialUser.username && 'off'}
              onBlur={handleConfirmBlur}
              placeholder="Confirm your password"
            />
          )}
        </Form.Item>
      </Form>
    </Drawer>
  )
})

export default userForm
