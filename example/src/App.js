import React from 'react'
import { Box, Button, gLog, IconButton, Typography, UtilsStyle, SuccessButton } from 'material-ui-helper'
import Test from './Test'

const App = () => {
  gLog('process.env.', process.env)

  return (
    <Box column={true} p={2}>
      <Box p={2}>
        <Button
          mx={2}
          variant="outlined"
          color={'#ce5'}
          typography={{
            variant: 'h1',
            color: 'red'
          }}>
          default button
        </Button>
        <SuccessButton mx={2}
                       typography={{
                         variant: 'h1'
                       }}>
          default button
        </SuccessButton>
      </Box>
      <Box variant={'h6'}
           hoverStyle={{
             backgroundColor:"red !important"
           }}
           borderRadius={30}
           style={{
             backgroundColor: 'blue',
           }}>
        test
        <Typography p={5} skeleton={true}>
          sss
        </Typography>
        <IconButton tooltip={'ssssssss'}>
          ffff
        </IconButton>
      </Box>
      <Test/>
    </Box>
  )
}

export default App
