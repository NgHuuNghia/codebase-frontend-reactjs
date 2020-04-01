import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { ERPGrid } from '@digihcs/grid'
import { DynamicPage, Modal, notification } from '@digihcs/innos-ui3'
import { GET_ROLES, DELETE_ROLE, GET_PERMISSIONS } from './queries'
import RoleForm from './roleForm'

const Role = () => {
  const { data: Permissions } = useQuery(GET_PERMISSIONS)
  const { data: dataRoles, refetch: refetchRoles } = useQuery(GET_ROLES, {
    fetchPolicy: 'network-only'
  })
  const [visible, setVisible] = useState(false)
  const [roleEdit, setRoleEdit] = useState({})
  const [isViewDetail, setIsViewDetail] = useState(false)
  const [deleteRole] = useMutation(DELETE_ROLE)
  const rowData = dataRoles && dataRoles.roles
  const dataPermissions = Permissions && Permissions.permissions
  const show = (roleInput = {}) => {
    setRoleEdit(roleInput)
    setVisible(true)
  }
  const viewDetail = (roleInput = {}) => {
    setRoleEdit(roleInput)
    setIsViewDetail(true)
    setVisible(true)
  }
  const hide = () => {
    setRoleEdit({})
    setVisible(false)
    setIsViewDetail(false)
  }
  const handleDeleteRole = (_id) => {
    Modal.confirm({
      title: 'Delete Role',
      content: 'Are you sure delete this role?',
      type: 'warning',
      centered: true,
      okText: 'Ok',
      cancelText: 'Cancel',
      onOk: () => {
        deleteRole({
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
            refetchRoles()
            notification.bar({
              title: 'Delete Role success',
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
        key: 'view',
        icon: 'Eye',
        type: 'single',
        onClick: rows => viewDetail(rows[0]),
        tooltip: 'View'
      },
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
        onClick: rows => handleDeleteRole(rows[0]._id)
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
        headerName: 'Name',
        field: 'code',
        pinned: 'left'
      },
      {
        headerName: 'Description',
        field: 'description',
        cellRenderer: params => params.value
      }
    ],
    floatingFilter: true,
    showCheckBox: false,
    rowSelection: 'single',
    rowDeselection: true,
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit()
    },
    rowData
  }
  return (
    <DynamicPage style={{ padding: '1rem 3rem 0' }}>
      <DynamicPage.HeaderTitle
        title="Role"
      />
      <DynamicPage.Content>
        {dataRoles && dataPermissions && (
          <div
            style={{
              height: 'calc(100vh - 145px)',
              padding: '15px 0'
            }}
          >
            <ERPGrid
              gridName='Role Manager'
              sheetName='Roles'
              {...gridOptions}
            />
            <RoleForm
              refetchRoles={refetchRoles}
              initialRole={roleEdit}
              hide={hide}
              visible={visible}
              dataPermissions={dataPermissions}
              isViewDetail={isViewDetail}
            />
          </div>
        )}


      </DynamicPage.Content>
    </DynamicPage>
  )
}

export default Role
