import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { AppBar, Toolbar } from '@material-ui/core'
import Box from '../box/Box'
import PropTypes from 'prop-types'


const useBottomToolbarStyles = makeStyles((theme) => ({
  bottomToolbarAppBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#fff !important',
    color: '#000',
    '&>div': {
      padding: 0,
      display: 'flex',
      alignItems: 'stretch'
    }
  }
}));

function BottomAppBar({ appBarProps={},toolbarProps={},...props }) {
  const classes = useBottomToolbarStyles()
  return (
    <AppBar position="fixed" color="primary" className={classes.bottomToolbarAppBar} {...appBarProps}>
      <Toolbar {...toolbarProps}>
        <Box width={1} center={true} {...props}>
          {props.children}
        </Box>
      </Toolbar>
    </AppBar>
  )
}


//region propTypes
BottomAppBar.propTypes = {
  appBarProps:PropTypes.object,
  toolbarProps:PropTypes.object,
}
export default BottomAppBar;
//endregion propTypes
