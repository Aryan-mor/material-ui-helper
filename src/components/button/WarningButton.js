import React from 'react'
import Button, { buttonPropType } from './Button'
import { useTheme } from '@material-ui/core'


function WarningButton({ children, ...props }) {
  const theme = useTheme()
  return (
    <Button color={theme.palette.warning.main} {...props}
            typography={{ color: props.variant === 'contained' ? '#fff' : undefined, ...props.typography }}>
      {children}
    </Button>
  )
}


WarningButton.defaultProps = {
  variant: 'contained',
}


WarningButton.propTypes = {...buttonPropType}

export default WarningButton
