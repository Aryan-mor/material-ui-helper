import React from 'react'
import Button, { buttonPropType } from './Button'
import { useTheme } from '@material-ui/core'


function SuccessButton({ children, ...props }) {
  const theme = useTheme()
  return (
    <Button color={theme.palette.success.main} {...props}
            typography={{ color: props.variant === 'contained' ? '#fff' : undefined, ...props.typography }}>
      {children}
    </Button>
  )
}


SuccessButton.defaultProps = {
  variant: 'contained',
}


SuccessButton.propTypes = {...buttonPropType}

export default SuccessButton
