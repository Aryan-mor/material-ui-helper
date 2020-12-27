import React from 'react'
import MaterialDialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import { Close } from '@material-ui/icons'
import _ from 'lodash'
import { isElement, tryIt } from '..'
import PropTypes from 'prop-types'
import Box from './Box'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Dialog(pr) {

  const {
    open,
    header,
    closeElement,
    fullWidth,
    fullScreen,
    transition,
    rootProps,
    headerProps,
    onOutSideClickClose,
    onClose,
    ...props
  } = pr


  const handleCloseDialog = (e) => {
    e.stopPropagation()
    tryIt(() => {
      onClose(e)
    })
  }


  const closeEl = (
    (closeElement && onClose) &&
    _.isFunction(closeElement) ?
      closeElement(handleCloseDialog) :
      <IconButton
        onClick={handleCloseDialog}>
        {
          isElement(closeElement) ?
            closeElement :
            <Close/>
        }
      </IconButton>
  )

  return (
    <MaterialDialog
      open={open}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      TransitionComponent={transition ? Transition : undefined}
      keepMounted
      onClose={onOutSideClickClose ? _.isFunction(onOutSideClickClose) ? onOutSideClickClose : handleCloseDialog : undefined}
      {...props}>
      <Box display={'flex'} flexDirection={'column'} {...rootProps}>
        {header ?
          <Box display={'flex'} alignItems={'center'} p={0.5} {...headerProps}>
            {closeEl}
            {
              isElement(header) &&
              header
            }
          </Box> :
          closeEl ?
            <Box
              style={{
                position: 'absolute',
                top: 2,
                left: 2
              }}
              {...headerProps}>
              {closeEl}
            </Box> :
            <React.Fragment/>
        }
        {props.children}
      </Box>
    </MaterialDialog>
  )
}


Dialog.defaultProps = {
  open: false,
  header: false,
  closeElement: true,
  fullWidth: false,
  fullScreen: false,
  transition: true,
  rootProps: {},
  headerProps: {},
  onOutSideClickClose: true
}

Dialog.propTypes = {
  open: PropTypes.bool,
  header: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  closeElement: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.func]),
  fullWidth: PropTypes.bool,
  fullScreen: PropTypes.bool,
  transition: PropTypes.bool,
  rootProps: PropTypes.object,
  headerProps: PropTypes.object,
  onOutSideClickClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onClose: PropTypes.func
}
