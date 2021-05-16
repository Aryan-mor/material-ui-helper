import React from 'react'
import { AppBar, Slide, Toolbar, useScrollTrigger } from '@material-ui/core'
import Box from '../box/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import BottomAppBar from './BottomAppBar'


const useStyle = makeStyles(theme => ({
  customHeaderRoot: {
    backgroundColor: '#fff !important',
    color: '#000 !important',
    "&>div": {
      padding: 0
    }
  }
}))
function AppBarHideOnScroll(pr) {
  const classes = useStyle()
  const { appBarProps = {}, toolbarProps = {}, children, ...props } = pr

  return (
      <HideOnScroll>
        <AppBar className={classes.customHeaderRoot} {...appBarProps}>
          <Toolbar {...toolbarProps}>
            <Box width={1} {...props}>
              {children}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
  )
}

//region propTypes
AppBarHideOnScroll.propTypes = {
  appBarProps:PropTypes.object,
  toolbarProps:PropTypes.object,
}
export default AppBarHideOnScroll;
//endregion propTypes

function HideOnScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}