import React from 'react'
import { useMutation } from 'react-apollo'
import { Form, Input, Modal, notification } from '@digihcs/innos-ui3'
import { CREATE_DISH, UPDATE_DISH } from './queries'

const DishForm = Form.create({ name: 'dish_form' })((props) => {
  const { form, onCloseModal, visible, refetchDishes, idShop, initialDish } = props
  const {
    resetFields,
    validateFields,
    getFieldDecorator,
    getFieldsError,
  } = form

  const { _id, name } = initialDish

  const [createDish] = useMutation(CREATE_DISH)
  const [updateDish] = useMutation(UPDATE_DISH)

  const handleSubmit = () => {
    validateFields((err, values) => {
      if (!err) {
        const { name } = values
        initialDish._id ? updateDish({
          variables: {
            id: _id,
            name
          }
        })
          .then(res => {
            if (res.errors) {
              notification.bar({
                title: 'update dish failed!',
                type: 'error',
                content: res.errors.message,
                placement: 'bottomRight',
                theme: 'pharmacy'
              })
            } else {
              // console.log(res.data.updateDish)
              refetchDishes()
              resetFields()
              onCloseModal()
              notification.bar({
                title: 'Update dish success',
                type: 'success',
                placement: 'bottomRight',
                theme: 'pharmacy'
              })
            }
          })
          .catch(error => {
            console.log(error)
            notification.bar({
              title: 'Update dish failed!',
              type: 'error',
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          })
          : createDish({
            variables: {
              name,
              idShop
            }
          })
            .then(res => {
              if (res.errors) {
                notification.bar({
                  title: 'Create dish failed!',
                  type: 'error',
                  content: res.errors.message,
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              } else {
                // console.log(res.data.createDish)
                refetchDishes()
                resetFields()
                onCloseModal()
                notification.bar({
                  title: 'Create dish success',
                  type: 'success',
                  placement: 'bottomRight',
                  theme: 'pharmacy'
                })
              }
            })
            .catch(err => {
              console.log(err)
              notification.bar({
                title: 'Create dish failed!',
                type: 'error',
                placement: 'bottomRight',
                theme: 'pharmacy'
              })
            })
      }
    })
  }
  return (
    <Modal
      title={initialDish._id ? 'Edit Dish' : 'Add Dish'}
      visible={visible}
      onCancel={() => { onCloseModal(); resetFields() }}
      cancelText='Cancel'
      onOk={() => handleSubmit()}
      okText={initialDish._id ? 'Save' : 'Add'}
      fieldsError={getFieldsError()}
      width="50%"
    >
      <Form>
        <Form.Item label="Dish name">
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: "Please input dish name." }
            ],
            initialValue: initialDish._id ? name : ''
          })(<Input placeholder="Please input dish name" />)}
        </Form.Item>
      </Form>
    </Modal>

  )
})
export default DishForm
