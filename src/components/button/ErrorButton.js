import React from 'react'
import Button, { buttonPropType } from './Button'
import { useTheme } from '@material-ui/core'


function ErrorButton({ children, ...props }) {
  const theme = useTheme()
  return (
    <Button color={theme.palette.error.main} {...props}
            typography={{ color: props.variant === 'contained' ? '#fff' : undefined, ...props.typography }}>
      {children}
    </Button>
  )
}


ErrorButton.defaultProps = {
  variant: 'contained',
}


ErrorButton.propTypes = {...buttonPropType}

export default ErrorButton
