import React, { useEffect } from 'react'
import { useTheme } from '@material-ui/core'
import { getSafe } from '..'
import MaterialBackdrop from '@material-ui/core/Backdrop'
import PropTypes from 'prop-types'


export default function Backdrop({ open, zIndex, timeout,transparent=false, onClose, onTimedOut, ...props }) {
  const theme = useTheme()

  useEffect(() => {
    if (open && timeout)
      setTimeout(() => {
        getSafe(() => onTimedOut())
      }, timeout)
  }, [open])

  return (
    <MaterialBackdrop
      open={open}
      onClick={onClose}
      style={{
        zIndex: zIndex || theme.zIndex.appBar - 1,
        backgroundColor:transparent ? "transparent":undefined,
        color: '#fff'
      }}>
      {props.children}
    </MaterialBackdrop>)
}

Backdrop.propTypes = {
  open: PropTypes.bool,
  zIndex: PropTypes.number,
  timeout: PropTypes.number,
  transparent:PropTypes.bool,
  onClose: PropTypes.func,
  onTimedOut: PropTypes.func
}
