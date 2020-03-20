import React from 'react'
import { Icon } from '@digihcs/innos-ui3'

const Marker = ({ text, iconName }) => {
 return (
   <div>
     <Icon name={iconName} style={{ fontSize: 30, color: 'red' }} />
     {text}
   </div>
  )
}

export default Marker
