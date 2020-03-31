/* eslint-disable no-nested-ternary */
import React from 'react'
import { useMutation } from 'react-apollo'
import { Form, Input, Drawer, notification, Select, Option } from '@digihcs/innos-ui3'

import { CREATE_NODE, UPDATE_NODE } from './queries/index'

const EnumCategory = ['COMPANY', 'CITY', 'DEPARTMENT']

const NodeForm = Form.create({ name: 'node_form' })(props => {
  const { form, initialNode, hide, visible, refetchNodes, refetchTreeNodes, isViewDetail, nodes } = props
  const {
    resetFields,
    validateFields,
    getFieldDecorator,
    getFieldsError,
  } = form
  const { _id, title, subtitle, idParent } = initialNode

  const [createNode] = useMutation(CREATE_NODE)
  const [updateNode] = useMutation(UPDATE_NODE)
  const handleSubmit = () => {
    validateFields((err, values) => {
      if (!err) {
        const { name, category, idParent } = values
        initialNode._id
          ? updateNode({
            variables: {
              _id,
              input: {
                name,
                category,
                idParent
              }
            }
          })
            .then(res => {
              if (res.errors) {
                notification.bar({
                  title: 'Update node failed!',
                  type: 'error',
                  content: res.errors.message,
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              } else {
                refetchTreeNodes()
                refetchNodes()
                resetFields()
                hide()
                notification.bar({
                  title: 'Update node success',
                  type: 'success',
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              }
            })
            .catch(error => {
              console.log(error)
              notification.bar({
                title: 'Update node failed!',
                type: 'error',
                placement: 'bottomRight',
                theme: 'pharmacy'
              })
            })
          : createNode({
            variables: {
              input: {
                name,
                category,
                idParent
              }
            }
          })
            .then(res => {
              if (res.errors) {
                notification.bar({
                  title: 'Create node failed!',
                  type: 'error',
                  content: res.errors.message,
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              } else {
                refetchTreeNodes()
                refetchNodes()
                resetFields()
                hide()
                notification.bar({
                  title: 'Create node success',
                  type: 'success',
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              }
            })
            .catch(err => {
              console.log(err)
              notification.bar({
                title: 'Create node failed!',
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
        {!_id ? 'Create Node' : isViewDetail ? 'Detail Node' : 'Update Node'}
      </h2>
      <Form style={{ marginTop: 20 }}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: title ? title : '',
            rules: [
              {
                required: true,
                messages: 'Please input name'
              },
              {
                pattern: /^[^\s]/,
                message: 'Không được có dấu cách đầu dòng'
              }
            ]
          })(
            <Input
              disabled={isViewDetail}
              autoComplete={initialNode.title && 'off'}
              placeholder="Input Name"
            />
          )}
        </Form.Item>
        <Form.Item label="Category">
          {getFieldDecorator('category', {
            initialValue: subtitle ? subtitle : EnumCategory[0],
            rules: [
              {
                required: true,
                messages: 'Please select category'
              }
            ]
          })(
            <Select disabled={isViewDetail} style={{ width: '100%' }}>
              {EnumCategory.map((cat, index) => {
                return (
                  <Option key={index} value={cat}>{cat}</Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Parent Node">
          {getFieldDecorator('idParent', {
            initialValue: idParent ? idParent : null,
          })(
            <Select disabled={isViewDetail} style={{ width: '100%' }}>
              <Option key={1} value={null} style={{ color: 'red' }}>NULL</Option>
              {nodes && nodes.map((node) => {
                return (
                  <Option key={node._id} value={node._id}>{node.name}</Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Drawer>
  )
})

export default NodeForm
