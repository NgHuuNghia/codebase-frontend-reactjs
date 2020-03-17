import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { ERPGrid } from '@digihcs/grid'
import { DynamicPage, Modal, notification } from '@digihcs/innos-ui3'

import { GET_USERS, DELETE_USER } from './queries'
import UserForm from './userForm'

const User = () => {
  const [visible, setVisible] = useState(false)
  const [userEdit, setUserEdit] = useState({})
  const { data: dataUsers, refetch: refetchUsers } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only'
  })
  const [deleteUser] = useMutation(DELETE_USER)

  const rowData = dataUsers && dataUsers.users

  const show = (userInput = {}) => {
    setUserEdit(userInput)
    setVisible(true)
  }
  const hide = () => {
    setUserEdit({})
    setVisible(false)
  }
  const handleDeleteUser = _id => {
    Modal.confirm({
      title: 'Delete User',
      content: 'Are you sure delete this user?',
      centered: true,
      okText: 'Ok',
      cancelText: 'Cancel',
      onOk: () => {
        deleteUser({
          variables: {
            _id
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
            refetchUsers()
            notification.bar({
              title: 'Delete user success',
              type: 'success',
              placement: 'bottomRight',
              theme: 'pharmacy'
            })
          }
        })
      }
    })
  }
  const gridOptions = {
    headerDefs: [
      {
        key: 'add',
        icon: 'Plus',
        type: 'default',
        tooltip: 'Tạo mới',
        onClick: () => show()
      },
      {
        key: 'delete',
        icon: 'Trash',
        type: 'single',
        tooltip: 'Xoá',
        onClick: rows => handleDeleteUser(rows[0]._id)
      },
      {
        key: 'edit',
        icon: 'Edit',
        type: 'single',
        tooltip: 'Chỉnh sửa',
        onClick: rows => show(rows[0])
      }
    ],
    columnDefs: [
      {
        headerName: 'Username',
        field: 'username',
        pinned: 'left'
      },
      {
        headerName: 'Full Name',
        field: 'fullName',
        cellRenderer: params => params.value && params.value.toUpperCase()
      }
    ],
    floatingFilter: true,
    showCheckBox: false,
    rowSelection: 'single',
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit()
    },
    rowData
  }

  return (
    <DynamicPage
      id="id"
      floorplans="work-list"
      style={{ backgroundColor: 'inherit', height: 'calc(100vh - 49px)' }}
    >
      <DynamicPage.HeaderTitle
        title="User"
        style={{ backgroundColor: 'inherit' }}
      />
      <DynamicPage.Content>
        {dataUsers && (
          <div
            style={{
              height: 'calc(100vh - 92px)',
              padding: '15px 0'
            }}
          >
            <ERPGrid
              gridName="Manager User"
              sheetName="User"
              {...gridOptions}
            />
          </div>
        )}
        <UserForm
          refetchUsers={refetchUsers}
          initialUser={userEdit}
          visible={visible}
          hide={hide}
        />
      </DynamicPage.Content>
    </DynamicPage>
  )
}

export default User
