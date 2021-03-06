import React from 'react'
import { ButtonBase as MaterialButtonBase } from '@material-ui/core'
import PropTypes from 'prop-types'
import Box, { boxPropType } from './box/Box'
import { UtilsStyle } from '../utils/Utils'


function ButtonBase(pr) {
  const {
    disabled,
    disableRipple,
    disableTouchRipple,
    borderRadius = 5,
    backgroundColor,
    hoverBackgroundColor,
    transitionDuration = 200,
    onClick,
    buttonProps = {},
    ...props
  } = pr
  return (
    <MaterialButtonBase
      disabled={disabled}
      disableRipple={disableRipple}
      disableTouchRipple={disableTouchRipple}
      onClick={onClick}
      {...buttonProps}
      style={{
        width: props.width === 1 ? '100%' : props.width,
        ...UtilsStyle.borderRadius(borderRadius),
        ...buttonProps.style
      }}>
      <Box
        display={'block'}
        borderRadius={borderRadius}
        {...props}
        style={{
          backgroundColor: backgroundColor,
          ...UtilsStyle.transition(transitionDuration),
          ...UtilsStyle.borderRadius(borderRadius),
          ...props.style
        }}>
        {props.children}
      </Box>
    </MaterialButtonBase>
  )
}


ButtonBase.prototype = {
  hoverBackgroundColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  buttonProps: PropTypes.object,
  transitionDuration: PropTypes.number,
  borderRadius: PropTypes.number,
  disabled: PropTypes.bool,
  disableRipple: PropTypes.bool,
  disableTouchRipple: PropTypes.bool,
  ...boxPropType
}

export default ButtonBase
