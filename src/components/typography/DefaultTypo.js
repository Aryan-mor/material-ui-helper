import Tp from '@material-ui/core/Typography'
import React from 'react'

export default function Typo({ cm = 'div', children, variant, ...props }) {

  return (
    <Tp component={cm} variant={variant} {...props}>
      {children}
    </Tp>
  )
}
