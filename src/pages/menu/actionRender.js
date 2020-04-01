import React, { useState } from 'react'
import { Button, Modal, notification } from '@digihcs/innos-ui3'
import { useMutation } from 'react-apollo'
import { DELETE_MENU, GET_MENUS_BY_NODE } from './queries'
import MenuForm from './menuForm'

function ActionRender(props) {
  const currentNode = 'abc1234'
  const [visible, setVisible] = useState(false)
  const hide = () => {
    setVisible(false)
  }
  const { agGridReact, data } = props
  const { rowData } = agGridReact.props
  const [deleteMenu] = useMutation(DELETE_MENU)

  function handleDeleteMenu() {
    Modal.confirm({
      title: 'Delete Menu',
      theme: 'translate',
      content: 'Are you sure delete this menu?',
      okText: 'Ok',
      cancelText: 'Cancel',
      onOk: () => {
        deleteMenu({
          variables: {
            id: data._id
          },
          refetchQueries: [
            {
              query: GET_MENUS_BY_NODE,
              variables: {
                idNode: currentNode
              }
            }
          ]
        }).then(() => {
          notification.bar({
            title: 'Thành công',
            type: 'success',
            placement: 'bottomRight',
            theme: 'pharmacy'
          })
        })
      }
    })
  }
  function editMenu() {
    setVisible(true)
  }
  return (
    rowData.some(item => item.isPublished) ? (
      data.isPublished && (
      <>
        <Button
          style={{ width: '55' }}
          onClick={editMenu}
        >
        Edit
        </Button>
        <MenuForm
          // refetchMenu={refetchMenu}
          _id={data?._id}
          name={data?.name}
          visible={visible}
          hide={hide}
          currentNode={currentNode}
        />
      </>
      )
    ) : (
      <div style={{ display: 'flex' }}>
        <Button
          style={{ width: '55px' }}
          onClick={editMenu}
        >
          Edit
        </Button>
        <Button
          style={{ marginLeft: '10px', width: '55px' }}
          onClick={handleDeleteMenu}
        >
          Delete
        </Button>
        <MenuForm
          // refetchMenu={refetchMenu}
          _id={data?._id}
          name={data?.name}
          visible={visible}
          hide={hide}
          currentNode={currentNode}
        />
      </div>
    )
  )
}
export default ActionRender
