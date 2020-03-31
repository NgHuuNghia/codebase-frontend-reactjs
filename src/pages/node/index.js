/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { DynamicPage, Button, Icon, Input, notification, Modal } from '@digihcs/innos-ui3'
import SortableTree from 'react-sortable-tree'
import { withApollo } from '@utils'
import 'react-sortable-tree/style.css'
import './index.scss'
import { GET_ALL_NODES, UPDATE_NODE } from './queries/index'
import NodeForm from './nodeForm'

const Node = ({ data: { refetch: refetchTreeNodes, treeNodes }, mutation: { deleteNode } }) => {
  const [keySearch, setKeySearch] = useState('')
  const [lenMatches, setLenMatches] = useState(0)
  const [indexSearch, setIndexSearch] = useState(0)
  const { data: nodes, refetch: refetchNodes } = useQuery(GET_ALL_NODES, {
    fetchPolicy: 'network-only'
  })

  const [visible, setVisible] = useState(false)
  const [roleEdit, setRoleEdit] = useState({})
  const [isViewDetail, setIsViewDetail] = useState(false)
  const [treeData, setTreeData] = useState(treeNodes)
  const [updateNode] = useMutation(UPDATE_NODE)
  useEffect(() => {
    setTreeData(treeNodes)
  }, [treeNodes])
  const show = (nodeInput = {}) => {
    setRoleEdit(nodeInput)
    setVisible(true)
  }
  const viewDetail = (nodeInput = {}) => {
    setRoleEdit(nodeInput)
    setIsViewDetail(true)
    setVisible(true)
  }
  const hide = () => {
    setRoleEdit({})
    setVisible(false)
    setIsViewDetail(false)
  }

  const handleDeleteNode = (_id) => {
    Modal.confirm({
      title: 'Delete Node',
      content: 'Are you sure delete this node?',
      type: 'warning',
      centered: true,
      okText: 'Ok',
      cancelText: 'Cancel',
      onOk: () => {
        deleteNode({
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
            refetchTreeNodes()
            refetchNodes()
            notification.bar({
              title: 'Delete Node success',
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
    <DynamicPage style={{ padding: '1rem 3rem 0' }}>
      <DynamicPage.HeaderTitle
        title="Node"
      />
      <DynamicPage.Content>
        {treeNodes && nodes && (
          <div className="tree-main">
            <div className="header-tree" style={{ display: 'flex', marginTop: '3%' }}>
              <Input
                suffix={(
                  <span> {lenMatches <= 0 ? '0/0' : `${indexSearch + 1}/${lenMatches}`}</span>
                )}
                style={{ marginLeft: '6%', width: 200 }}
                value={keySearch}
                onChange={(e) => setKeySearch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && keySearch !== '') {
                    const index = (indexSearch + 1) >= lenMatches ? 0 : indexSearch + 1
                    setIndexSearch(index)
                  }
                }}
              />
              <Button
                noFill
                style={{ marginLeft: 15, fontSize: 22 }}
                disabled={lenMatches === 0 ? true : false}
                onClick={() => {
                  const index = (indexSearch - 1) < 0 ? lenMatches - 1 : indexSearch - 1
                  setIndexSearch(index)
                }}
              >
                <span><Icon type="chevron-left" /></span>
              </Button>
              <Button
                noFill
                style={{ marginLeft: 10, fontSize: 22 }}
                disabled={lenMatches === 0 ? true : false}
                onClick={() => {
                  const index = (indexSearch + 1) >= lenMatches ? 0 : indexSearch + 1
                  setIndexSearch(index)
                }}
              >
                <span><Icon type="chevron-right" /></span>
              </Button>
              <Button
                noFill
                style={{ marginLeft: 10, fontSize: 22 }}
                onClick={() => show()}
              >
                <span><Icon type="plus" /></span>
              </Button>
            </div>
            <div
              style={{
                height: '65vh',
                padding: '5px 50px'
              }}
            >
              <SortableTree
                treeData={treeData}
                onChange={treeData => setTreeData(treeData)}
                getNodeKey={({ node }) => node._id}
                generateNodeProps={({ node }) => {
                  return ({
                    title: (
                      <span style={{ fontSize: '85%', display: 'block', height: '.8rem', fontWeight: 700 }}>
                        {node.title}
                      </span>
                    ),
                    subtitle: (
                      <span>
                        {node.subtitle}
                      </span>
                    ),
                    buttons: [
                      <Button noFill onClick={() => viewDetail(node)}>
                        <span><Icon type="eye" /></span>
                      </Button>,
                      <Button noFill onClick={() => show(node)}>
                        <span><Icon type="edit-2" /></span>
                      </Button>,
                      <Button noFill onClick={() => handleDeleteNode(node._id)}>
                        <span><Icon type="trash" /></span>
                      </Button>
                    ]
                  })
                }}
                searchQuery={keySearch}
                searchMethod={({ node, searchQuery }) => {
                  if (node.title.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery !== '' && searchQuery !== ' ') {
                    return true
                  }
                  return false
                }}
                searchFocusOffset={indexSearch}
                searchFinishCallback={(matches) => {
                  setLenMatches(matches.length)
                }}
                onMoveNode={({ node, nextParentNode }) => {
                  updateNode({
                    variables: {
                      _id: node._id,
                      input: {
                        name: node.title,
                        category: node.subtitle,
                        idParent: nextParentNode?._id || null
                      }
                    }
                  })
                    .then(res => {
                      if (res.errors) {
                        notification.bar({
                          title: 'Move node failed!',
                          type: 'error',
                          content: res.errors.message,
                          placement: 'bottomRight',
                          theme: 'pharmacy'
                        })
                      } else {
                        refetchTreeNodes()
                        refetchNodes()
                        hide()
                        notification.bar({
                          title: 'Move node success',
                          type: 'success',
                          placement: 'bottomRight',
                          theme: 'pharmacy'
                        })
                      }
                    })
                    .catch(error => {
                      console.log(error)
                      notification.bar({
                        title: 'Move node failed!',
                        type: 'error',
                        placement: 'bottomRight',
                        theme: 'pharmacy'
                      })
                    })
                }}
              />
            </div>
            <NodeForm
              refetchNodes={refetchNodes}
              refetchTreeNodes={refetchTreeNodes}
              initialNode={roleEdit}
              hide={hide}
              visible={visible}
              isViewDetail={isViewDetail}
              nodes={nodes.nodes}
            />
          </div>
        )}


      </DynamicPage.Content>
    </DynamicPage>
  )
}
export default withApollo(Node)([
  {
    query: `
      query treeNodes {
        treeNodes {
          _id
          title
          subtitle
          expanded
          idParent
          children {
            _id
            title
            subtitle
            expanded
            idParent
            children {
              _id
              title
              subtitle
              expanded
              idParent
              children {
                _id
                title
                subtitle
                expanded
                idParent
              }
            }
          }
        }
      }
    `
  },
  {
    mutation: `
      mutation deleteNode($_id: ID!){
        deleteNode(_id: $_id)
      }
    `,
    name: 'deleteNode'
  }

])
