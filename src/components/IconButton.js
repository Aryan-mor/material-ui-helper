import React from 'react'
import { IconButton as MaterialIconButton } from '@material-ui/core'
import Tooltip, { tooltipPrototype } from './Tooltip'
import PropTypes from 'prop-types'


function IconButton(pr) {
  const { tooltip,disabled, tooltipDisable, ...props }=pr

  const el = (
    <MaterialIconButton disabled={disabled} {...props}>
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
  tooltip:PropTypes.string,
  tooltipDisable:PropTypes.bool,
  disabled:PropTypes.bool,
  ...tooltipPrototype
}


export default IconButton;
