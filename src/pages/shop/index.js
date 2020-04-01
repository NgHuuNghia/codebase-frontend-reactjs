import React, { useState, useRef } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { ERPGrid } from '@digihcs/grid'
import { DynamicPage, Modal, notification } from '@digihcs/innos-ui3'
import { GET_SHOPS, DELETE_SHOP } from './queries'
import ShopForm from './shopForm'

const Shop = () => {
  const gridApi = useRef(null)
  const [formVisible, setFormVisible] = useState(false)
  const [formData, setFormData] = useState({})
  const { data: dataShops, refetch: refetchShops } = useQuery(GET_SHOPS, {
    fetchPolicy: 'network-only'
  })
  const [deleteShop] = useMutation(DELETE_SHOP)
  const rowData = dataShops && dataShops.shops
  const handleEditShop = (selectedShop) => {
    setFormData(selectedShop)
    setFormVisible(true)
  }

  const handleDeleteShop = (_id) => {
    Modal.confirm({
      title: 'Delete Shop',
      content: 'Are you sure delete this shop?',
      type: 'warning',
      centered: true,
      okText: 'Ok',
      cancelText: 'Cancel',
      onOk: () => {
        deleteShop({
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
            refetchShops()
            notification.bar({
              title: 'Delete shop success',
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
    onGridReady: gridOpts => {
      gridApi.current = gridOpts.api
    },
    headerDefs: [
      {
        key: 'delete',
        icon: 'Trash',
        type: 'single',
        tooltip: 'Xoá',
        onClick: rows => handleDeleteShop(rows[0]._id)
      },
      {
        key: 'edit',
        icon: 'Edit',
        type: 'single',
        tooltip: 'Chỉnh sửa',
        onClick: (rows) => handleEditShop(rows[0])
      },
      {
        key: 'add',
        icon: 'Plus',
        type: 'default',
        tooltip: 'Tạo mới',
        onClick: () => setFormVisible(true)
      },
    ],
    columnDefs: [
      {
        headerName: 'Name',
        field: 'name',
        pinned: 'left'
      }
    ],
    rowSelection: 'single',
    rowDeselection: true,
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit()
    },
    rowData
  }
  const deselectRow = () => {
    gridApi.current && gridApi.current.deselectAll()
  }

  return (
    <DynamicPage
      id='id'
      floorplans='work-list'
      style={{ padding: '1rem 3rem 0' }}
    >
      <DynamicPage.HeaderTitle
        title='Shop'
      />
      <DynamicPage.Content>
        {dataShops && (
          <div
            style={{
              height: 'calc(100vh - 145px)',
              padding: '15px 0'
            }}
          >
            <ERPGrid
              gridName='Shop Manager'
              sheetName='Shops'
              {...gridOptions}
            />
          </div>
        )}
        <ShopForm
          refetchShops={refetchShops}
          selectedShop={formData}
          showForm={formVisible}
          hideForm={setFormVisible}
          clearForm={setFormData}
          deselectRow={deselectRow}
        />
      </DynamicPage.Content>
    </DynamicPage>
  )
}

export default Shop
