import React from 'react'
import { IconButton as MaterialIconButton } from '@material-ui/core'
import Tooltip, { tooltipPrototype } from './Tooltip'
import PropTypes from 'prop-types'


function IconButton(pr) {
  const { tooltip, tooltipDisable, ...props }=pr

  const el = (
    <MaterialIconButton>
      {props.children}
    </MaterialIconButton>
  )

  return (
    tooltip ?
      <Tooltip title={tooltip} disable={tooltipDisable}>
        {el}
      </Tooltip> :
      el
  )
}

IconButton.prototype = {
  tooltipDisable:PropTypes.bool,
  ...tooltipPrototype
}


export default IconButton;
