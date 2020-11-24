import React from 'react'
import {UtilsStyle,Box, Typography, IconButton,gLog } from 'material-ui-helper'

const App = () => {
  gLog("process.env.",process.env)

  return (
      <Box variant={'h6'}
      style={{
        backgroundColor:"blue",
          ...UtilsStyle.borderRadius(30)
      }}>
        test
        <Typography p={5} skeleton={true}>
          sss
        </Typography>
        <IconButton tooltip={'ssssssss'}>
          ffff
        </IconButton>
      </Box>)
}

export default App
