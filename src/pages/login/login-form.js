import React, { useState } from 'react'
import { Form, Icon, Input, Checkbox } from 'antd'
import { Button, notification } from '@digihcs/innos-ui3'
import { AlertTriangle } from 'react-feather'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const LOGIN_USER = gql`
  mutation login($input: LoginUserInput!) {
    login(input: $input) {
      accessToken
    }
  }
`

function NormalLoginForm(props) {
  const [checked, setChecked] = useState(false)
  const [login] = useMutation(LOGIN_USER)

  const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  const handleSubmit = e => {
    e.preventDefault()
    const { form } = props
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        const { username, password } = values
        login({
          variables: {
            input: {
              username,
              password
            }
          }
        })
          .then(res => {
            const { accessToken } = res.data.login
            props.store.Auth.authenticate(accessToken)
            props.history.push('/')
            notification.bar({
              title: 'Đăng nhập thành công',
              type: 'success',
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          })
          .catch(err => {
            console.log(err)
            notification.bar({
              title: 'Tên đăng nhập hoặc mật khẩu sai',
              type: 'error',
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          })
      }
    })
  }

  const handleEnter = e => {
    const { form } = props
    if (e.keyCode === 13) {
      e.preventDefault()
      handleSubmit(e)
      form.validateFields()
    }
  }

  const {
    form: { getFieldDecorator, getFieldsError }
  } = props

  return (
    <>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue: '',
            rules: [
              { required: true, message: 'Vui lòng nhâp tên đăng nhập' },
              {
                pattern: /^[^\s]/,
                message: 'Không được có dấu cách đầu dòng'
              }
            ]
          })(
            <Input
              size="large"
              placeholder="Tên đăng nhập"
              spellCheck={false}
              onKeyDown={handleEnter}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [{ required: true, message: 'Vui lòng nhập mật khẩu' }]
          })(
            <Input.Password
              type="password"
              size="large"
              placeholder="Mật khẩu"
              spellCheck={false}
              onKeyDown={handleEnter}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('staySignedIn')(
            <Checkbox checked={checked} onClick={() => setChecked(!checked)}>
              Ghi nhớ tôi
            </Checkbox>
          )}
          <div className="forgot-btn">Quên mật khẩu?</div>
        </Form.Item>
        <Form.Item>
          <Button
            // type="primary"
            size="large"
            // htmlType="submit"
            block
            // onClick={() => handle(getFieldsValue(["username", "password"]))}
            // onClick={() => console.log("ok")}
            disabled={hasErrors(getFieldsError())}
            className="submitLogin"
            style={{ height: 46, width: '100%' }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <div
        className="error-wrapper"
        style={{ opacity: hasErrors(getFieldsError()) ? '1' : '0' }}
      >
        <Icon component={AlertTriangle} />
        <span className="text">
          Sai tên đăng nhập hoặc mật khẩu, vui lòng nhập lại{' '}
        </span>
      </div>
    </>
  )
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)

export default inject('store')(observer(withRouter(LoginForm)))
