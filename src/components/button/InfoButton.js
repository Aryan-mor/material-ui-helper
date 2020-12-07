import React from 'react'
import Button, { buttonPropType } from './Button'
import { useTheme } from '@material-ui/core'


function InfoButton({ children, ...props }) {
  const theme = useTheme()
  return (
    <Button color={theme.palette.warning.main} {...props}
            typography={{ color: props.variant === 'contained' ? '#fff' : undefined, ...props.typography }}>
      {children}
    </Button>
  )
}


InfoButton.defaultProps = {
  variant: 'contained',
}


InfoButton.propTypes = {...buttonPropType}

export default InfoButton
