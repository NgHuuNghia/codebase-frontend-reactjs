/* eslint-disable no-param-reassign */

import * as _ from 'lodash-es'

function generateTreeData(nodes) {
  const data = _.groupBy(nodes, 'category')
  const { COMPANY, CITY, DEPARTMENT } = data

   _.forEach(COMPANY, (company) => {
    company.children = []
    company.expanded = true
  })
   _.forEach(CITY, (city) => {
    city.children = []
    city.expanded = true
  })

   _.forEach(DEPARTMENT, (department) => {
    _.forEach(CITY, (city) => {
      if (city._id === department.parent._id) {
        city.children.push(department)
      }
    })
  })
   _.forEach(CITY, (city) => {
    _.forEach(COMPANY, (company) => {
      if (company._id === city.parent._id) {
        company.children.push(city)
      }
    })
  })
  return COMPANY
}

export { generateTreeData }
