import React, { useState } from 'react'
import { ERPGrid } from '@digihcs/grid'
import { Form } from 'antd'
import { DynamicPage } from '@digihcs/innos-ui3'
import { useQuery } from 'react-apollo'
import { GET_MENUS_BY_NODE } from './queries'
import MenuForm from './menuForm'
import ActionRender from './actionRender'

const Menu = () => {
  const currentNode = 'abc1234'
  const [visible, setVisible] = useState(false)
  const { data: dataMenu, refetch: refetchMenu } = useQuery(GET_MENUS_BY_NODE, {
    variables: { idNode: currentNode },
    fetchPolicy: 'network-only'
  })
  const rowData = dataMenu && dataMenu.menusByNode
  const hide = () => {
    setVisible(false)
  }
  const gridOptions = {
    headerDefs: [
      {
        key: 'add',
        icon: 'Plus',
        type: 'default',
        tooltip: 'Tạo mới',
        onClick: () => setVisible(true)
      }
    ],
    columnDefs: [
      {
        headerName: 'Tên thực đơn',
        field: 'name'
      },
      {
        headerName: 'Công khai',
        field: 'isPublished',
        cellRenderer: params => `<span role='img' style="font-size: 22px; color: #87d068;">${
          params.value ? '✔' : ''
          }</span>`
      },
      {
        headerName: 'Hành động',
        field: 'isActive',
        cellRenderer: 'action'
      }
    ],
    rowData,
    showCheckBox: false,
    hideCheckbox: true,
    frameworkComponents: {
      action: ActionRender
    },
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit()
    },
  }
  return (
    <>
      <DynamicPage
        style={{ padding: '1rem 3rem 0' }}
      >
        <DynamicPage.HeaderTitle
          title="Quản lý thực đơn"
          style={{ backgroundColor: 'inherit' }}
        />
        <DynamicPage.Content>
          {dataMenu && (
            <div
              style={{
                height: 'calc(100vh - 145px)',
                padding: '15px 0'
              }}
            >
              <ERPGrid
                reactNext
                gridName="Menu"
                sheetName="Menu"
                {...gridOptions}
              />
            </div>
          )}
          <MenuForm
            refetchMenu={refetchMenu}
            visible={visible}
            hide={hide}
            currentNode={currentNode}
          />
        </DynamicPage.Content>
      </DynamicPage>
    </>
  )
}

export default Form.create({ name: 'Menu' })(Menu)
