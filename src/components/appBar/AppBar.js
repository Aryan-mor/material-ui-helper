import React from 'react'
import { AppBar as MaterialAppBar, Toolbar } from '@material-ui/core'
import Box from '../box/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'


const useStyle = makeStyles(theme => ({
  customHeaderRoot: {
    backgroundColor: '#fff !important',
    color: '#000 !important',
    '&>div': {
      padding: 0
    }
  }
}))

function AppBar(pr) {
  const classes = useStyle()
  const { appBarProps = {}, toolbarProps = {}, children, ...props } = pr

  return (
      <MaterialAppBar className={classes.customHeaderRoot} {...appBarProps}  {...props}>
        <Toolbar {...toolbarProps}>
          <Box width={1}>
            {children}
          </Box>
        </Toolbar>
      </MaterialAppBar>
  )
}

//region propTypes
AppBar.propTypes = {
  appBarProps: PropTypes.object,
  toolbarProps: PropTypes.object
}

export default AppBar

//endregion propTypes