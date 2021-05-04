import React from 'react'
import MaterialDialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import { Close } from '@material-ui/icons'
import _ from 'lodash'
import { gLog, isElement, tryIt } from '..'
import PropTypes from 'prop-types'
import Box from './box/Box'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})


export default function Dialog(pr) {

  const {
    open,
    header,
    closeElement,
    maxWidth,
    fullWidth,
    fullScreen,
    scroll,
    transition,
    rootProps,
    headerProps,
    onBackdropClick,
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
    (closeElement && onClose) ?
      _.isFunction(closeElement) ?
        closeElement(handleCloseDialog) :
        <IconButton
          onClick={handleCloseDialog}>
          {
            isElement(closeElement) ?
              closeElement :
              <Close/>
          }
        </IconButton> :
      <React.Fragment/>
  )


  return (
    <MaterialDialog
      open={open}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      scroll={scroll}
      maxWidth={maxWidth === 'false' ? false : maxWidth}
      TransitionComponent={transition === false ? undefined : transition}
      keepMounted
      onBackdropClick={_.isFunction(onBackdropClick) ? onBackdropClick : undefined}
      onClose={!onBackdropClick ? handleCloseDialog : undefined}
      {...props}>
      <Box display={'flex'} flexDirection={'column'} {...rootProps}>
        {
          header ?
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
  scroll: 'paper',
  transition: Transition,
  maxWidth: 'lg',
  rootProps: {},
  headerProps: {},
  onBackdropClick: true
}

Dialog.propTypes = {
  open: PropTypes.bool,
  header: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  closeElement: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.func]),
  fullWidth: PropTypes.bool,
  fullScreen: PropTypes.bool,
  transition: PropTypes.any,
  rootProps: PropTypes.object,
  headerProps: PropTypes.object,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'false']),
  scroll: PropTypes.oneOf(['body', 'paper']),
  onBackdropClick: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onClose: PropTypes.func
}
