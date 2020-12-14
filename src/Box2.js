import React from 'react'
import Box from '@material-ui/core/Box'

export default function({children,...props}) {

  return(
    <Box {...props}>
      {children}
    </Box>
  )
}
