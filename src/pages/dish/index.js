import React, { useState } from 'react'
import { ERPGrid } from '@digihcs/grid'
import { notification } from '@digihcs/innos-ui3'
import { withApollo } from '@utils'
import DishForm from './dishForm'

const Dish = ({ data: { refetch: refetchDishes, dishesByShop }, mutation: { deleteDishes }, ...props }) => {
  const rowData = dishesByShop
  const { idShop } = props
  const [visible, setVisible] = useState(false)
  const [dishEdit, setDishEdit] = useState({})

  const onCloseModal = () => {
    setDishEdit({})
    setVisible(false)
  }

  const onOpenModal = (dishEdit = {}) => {
    setDishEdit(dishEdit)
    setVisible(true)
  }

  const handleDeleteUser = (rows) => {
    const ids = rows.map((row) => row._id)
    deleteDishes({
      variables: {
        ids
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
        refetchDishes()
        notification.bar({
          title: 'Delete dishes success',
          type: 'success',
          placement: 'bottomRight',
          theme: 'pharmacy'
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
        tooltip: 'add dish',
        onClick: () => onOpenModal()
      },
      {
        key: 'delete',
        icon: 'Trash',
        type: 'multi',
        tooltip: 'delete dish',
        onClick: rows => handleDeleteUser(rows)
      },
      {
        key: 'edit',
        icon: 'Edit',
        type: 'single',
        tooltip: 'edit dish',
        onClick: rows => onOpenModal(rows[0])
      }
    ],
    columnDefs: [
      {
        headerName: 'Dish',
        field: 'name',
        pinned: 'left'
      }
    ],
    floatingFilter: true,
    showCheckBox: true,
    rowSelection: 'multiple',
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit()
    },
    rowData
  }

  return (
    <div>
      {dishesByShop && (
        <div
          style={{
            height: 'calc(88vh - 145px)',
            padding: '15px 20px'
          }}
        >
          <ERPGrid
            gridName="Manage Dish By Shop"
            sheetName="Dishes"
            {...gridOptions}
          />
        </div>
      )}
      <DishForm
        idShop={idShop}
        initialDish={dishEdit}
        visible={visible}
        onCloseModal={onCloseModal}
        refetchDishes={refetchDishes}
      />
    </div>

  )
}

export default withApollo(Dish)([
  {
    query: `
      query dishesByShop ($ID: ID!) {
        dishesByShop(idShop:$ID){
          _id
          name
          updatedAt
          createdAt
        }
      }
    `,
    options: props => {
      const { idShop } = props
      return {
        variables: {
          ID: idShop
        },
        fetchPolicy: 'no-cache'
      }
    }
  },
  {
    mutation: `
      mutation deleteDishes ($ids: [ID!]) {
         deleteDishes(ids: $ids)
      }
    `,
    name: 'deleteDishes'
  }

])
