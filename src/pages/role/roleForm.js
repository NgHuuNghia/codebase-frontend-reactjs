/* eslint-disable no-nested-ternary */
import React from 'react'
import { useMutation } from 'react-apollo'
import { Form, Input, Drawer, notification } from '@digihcs/innos-ui3'
import { Select } from 'antd'

import { CREATE_ROLE, UPDATE_ROLE } from './queries'

const { Option } = Select

const roleForm = Form.create({ name: 'role_form' })(props => {
  const { form, initialRole, hide, visible, refetchRoles, dataPermissions, isViewDetail } = props
  const {
    resetFields,
    validateFields,
    getFieldDecorator,
    getFieldsError,
  } = form
  const { _id, code, description, permissions } = initialRole
  const [createRole] = useMutation(CREATE_ROLE)
  const [updateRole] = useMutation(UPDATE_ROLE)

  const handleSubmit = () => {
    validateFields((err, values) => {
      if (!err) {
        const { code, description, permissions } = values
        initialRole._id
          ? updateRole({
            variables: {
              _id,
              input: {
                code,
                description,
                permissions
              }
            }
          })
            .then(res => {
              if (res.errors) {
                notification.bar({
                  title: 'Create role failed!',
                  type: 'error',
                  content: res.errors.message,
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              } else {
                refetchRoles()
                resetFields()
                hide()
                notification.bar({
                  title: 'Update role success',
                  type: 'success',
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              }
            })
            .catch(error => {
              console.log(error)
              notification.bar({
                title: 'Update role failed!',
                type: 'error',
                placement: 'bottomRight',
                theme: 'pharmacy'
              })
            })
          : createRole({
            variables: {
              input: {
                code,
                description,
                permissions
              }
            }
          })
            .then(res => {
              if (res.errors) {
                notification.bar({
                  title: 'Create role failed!',
                  type: 'error',
                  content: res.errors.message,
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              } else {
                refetchRoles()
                resetFields()
                hide()
                notification.bar({
                  title: 'Create role success',
                  type: 'success',
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              }
            })
            .catch(err => {
              console.log(err)
              notification.bar({
                title: 'Create role failed!',
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
      showFooter={isViewDetail ? false : true}
      fieldsError={getFieldsError()}
      onOk={handleSubmit}
      onCancel={() => {
        hide()
        resetFields()
      }}
    >
      <h2 style={{ borderBottom: '1px solid #ccc', padding: 10, margin: 0 }}>
        { !_id ? 'Create Role' : isViewDetail ? 'Detail Role' : 'Update Role'}
      </h2>
      <Form style={{ marginTop: 20 }}>
        <Form.Item label="Code">
          {getFieldDecorator('code', {
            initialValue: code ? code : '',
            rules: [
              {
                required: true,
                messages: 'Please input code'
              },
              {
                pattern: /^[^\s]/,
                message: 'Không được có dấu cách đầu dòng'
              }
            ]
          })(
            <Input
              disabled={isViewDetail}
              autoComplete={initialRole.code && 'off'}
              placeholder="Input Code"
            />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: description ? description : '',
            rules: [
              {
                messages: 'Please input description'
              }
            ]
          })(
            <Input
              disabled={isViewDetail}
              autoComplete={initialRole.description && 'off'}
              placeholder="Input description"
            />
          )}
        </Form.Item>
        <Form.Item label="Permissions">
          {getFieldDecorator('permissions', {
            initialValue: permissions ? permissions : [],
            rules: [
              {
                type: 'array',
                messages: 'Please input permissions'
              }
            ]
          })(
            <Select
              disabled={isViewDetail}
              mode="multiple"
              placeholder="Please select"
              style={{ width: '100%' }}
            >
              {dataPermissions && dataPermissions.map(permission => {
                return (
                  <Option value={permission.code} label="China">
                    <div className="demo-option-label-item">
                      <span role="img" aria-label="China">
                        {permission.code}
                      </span>
                    </div>
                  </Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Drawer>
  )
})

export default roleForm
