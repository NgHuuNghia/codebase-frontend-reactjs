import React from 'react'
import { useMutation } from 'react-apollo'
import { Form, Input, Drawer, notification } from '@digihcs/innos-ui3'
import Dish from '@pages/dish'
import { CREATE_SHOP, UPDATE_SHOP } from './queries'

const shopForm = Form.create({ name: 'shop_form' })(props => {
  const { form, selectedShop, showForm, hideForm, clearForm, refetchShops, deselectRow } = props
  const {
    getFieldDecorator,
    getFieldsError,
    validateFields,
    resetFields
  } = form
  const [createShop] = useMutation(CREATE_SHOP)
  const [updateShop] = useMutation(UPDATE_SHOP)
  const handleSubmit = () => {
    validateFields((err, values) => {
      if (err) {
        console.log(err)
        return
      }
      const { _id } = selectedShop
      const { name } = values
      if (_id) {
        updateShop({
          variables: { _id, name }
        }).then(res => {
          if (res.errors) {
            notification.bar({
              title: 'Update shop failed!',
              type: 'error',
              content: res.errors.message,
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          } else {
            resetFields()
            clearForm({})
            hideForm(false)
            refetchShops()
            deselectRow()
            notification.bar({
              title: 'Update shop success',
              type: 'success',
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          }
        })
      } else {
        createShop({
          variables: { shopName: { name } }
        }).then(res => {
          if (res.errors) {
            notification.bar({
              title: 'Create shop failed!',
              type: 'error',
              content: res.errors.message,
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          } else {
            resetFields()
            clearForm({})
            hideForm(false)
            refetchShops()
            notification.bar({
              title: 'Create shop success',
              type: 'success',
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          }
        })
      }
    })
  }

  return (
    <Drawer
      open={showForm}
      showFooter
      fieldsError={getFieldsError()}
      onOk={handleSubmit}
      onCancel={() => {
        resetFields()
        clearForm({})
        hideForm(false)
      }}
    >
      <h2 style={{ borderBottom: '1px solid #ccc', padding: 10, margin: 0, textAlign: 'center' }}>
        {selectedShop?._id ? 'Update Shop' : 'New Shop'}
      </h2>
      <Form style={{ marginTop: 20 }}>
        <Form.Item label='Name:'>
          {getFieldDecorator('name', {
            initialValue: selectedShop?.name ? selectedShop?.name : '',
            rules: [
              {
                required: true
              }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        {
          selectedShop?._id ? <Dish idShop={selectedShop._id} /> : null
        }
      </Form>
    </Drawer>
  )
  })

export default shopForm
