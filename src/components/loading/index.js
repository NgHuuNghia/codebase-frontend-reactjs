import React from 'react'
import { Preloader } from '@digihcs/innos-ui3'

const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.7
      }}
    >
      <Preloader size={50} color="lemonchiffon" />
    </div>
  )
}

export default Loading
