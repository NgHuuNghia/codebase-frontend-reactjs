import React from 'react'
import { useMutation } from 'react-apollo'
import { Form, Input, Drawer, notification } from '@digihcs/innos-ui3'

import { CREATE_MENU, UPDATE_MENU, GET_MENUS_BY_NODE } from './queries'

const menuForm = Form.create({ name: 'user_form' })(props => {
  const { form, currentNode, hide, visible, refetchMenu, _id, name } = props
  const { getFieldDecorator, getFieldsError, resetFields } = form
  const [createMenu] = useMutation(CREATE_MENU)
  const [updateMenu] = useMutation(UPDATE_MENU)
  const addMenu = () => {
    form.validateFields((err, values) => {
      if (!err) {
        // eslint-disable-next-line no-unused-vars
        const { name } = values
        createMenu({
          variables: {
            input: {
              name,
              idNode: currentNode
            }
          }
        })
        .then(res => {
          if (res.errors) {
            notification.bar({
              type: 'error',
              content: res.errors.message,
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          } else {
              refetchMenu()
              resetFields()
              hide()
            notification.bar({
              title: 'Thành công',
              type: 'success',
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          }
        })
        .catch(error => {
          console.log(error)
              notification.bar({
                title: 'Create failed!',
                type: 'error',
                placement: 'bottomRight',
                theme: 'pharmacy'
              })
        })
      }
    })
  }
  const editMenu = () => {
    form.validateFields((err, values) => {
      if (!err) {
        // eslint-disable-next-line no-unused-vars
        const { name } = values
        updateMenu({
          variables: {
              id: _id,
              name
          },
          refetchQueries: [
            {
              query: GET_MENUS_BY_NODE,
              variables: {
                idNode: currentNode
              }
            }
          ]
        })
        .then(res => {
          if (res.errors) {
            notification.bar({
              type: 'error',
              content: res.errors.message,
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          } else {
              resetFields()
              hide()
            notification.bar({
              title: 'Thành công',
              type: 'success',
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          }
        })
        .catch(error => {
          console.log(error)
              notification.bar({
                title: 'Update failed!',
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
      showFooter
      open={visible}
      onCancel={() => {
          hide()
          resetFields()
        }}
      onOk={_id ? editMenu : addMenu}
      fieldsError={getFieldsError()}
    >
      <h2 style={{ borderBottom: '1px solid #ccc', padding: 10, margin: 0 }}>
        { _id ? 'Update Menu' : 'Create Menu' }
      </h2>
      <Form style={{ marginTop: 20 }}>
        <Form.Item label="Tên Menu">
          {getFieldDecorator('name', {
            initialValue: _id ? name : '',
            rules: [
              { required: true,
                message: 'Vui lòng nhập tên thực đơn'
              },
            ]
          })(
            <Input
              size="large"
              placeholder="Nhập tên thực đơn"
            />
          )}
        </Form.Item>
      </Form>
    </Drawer>
  )
})
export default menuForm
