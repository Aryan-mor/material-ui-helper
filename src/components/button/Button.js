import React from 'react'
import Box from '../Box'
import MButton from '@material-ui/core/Button'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Typography from '../Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

function Button(pr) {
  const {
    component,
    variant,
    colorDef,
    color,
    size,
    loading,
    loadingProps,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    startIcon,
    endIcon,
    fullWidth,
    href,
    buttonProps,
    styleProps,
    typography,
    ...props
  } = pr


  const disabledRenderVal = loading || disabled

  return (
    <Box
      width={fullWidth ? 1 : 0}
      {...props}>
      <MButton
        component={component}
        variant={variant}
        size={size}
        color={colorDef}
        disabled={disabledRenderVal}
        disableElevation={disableElevation}
        disableFocusRipple={disableFocusRipple}
        disableRipple={disableRipple}
        startIcon={startIcon}
        endIcon={endIcon}
        fullWidth={fullWidth}
        href={href}
        {...buttonProps}
        style={{
          position: 'relative',
          backgroundColor: (!disabledRenderVal && variant === 'contained') ? color : undefined,
          borderColor: (!disabledRenderVal && variant === 'outlined') ? color : undefined,
          ...buttonProps.style,
          ...styleProps
        }}>
        {_.isObject(typography) ?
          <Typography
            {...typography}
            component={typography.component || 'span'}
            color={!disabledRenderVal ? typography.color : undefined}>
            {props.children}
          </Typography> :
          props.children
        }

        {loading &&
        <Box
          center={true}
          style={{
            position: 'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0
          }}>
          <CircularProgress
            size={24}
            {...loadingProps}
            style={{
              ...loadingProps.style
            }}/>
        </Box>}
      </MButton>
    </Box>
  )
}


Button.defaultProps = {
  variant: 'contained',
  colorDef: 'default',
  loading: false,
  loadingProps: {},
  disabled: false,
  disableElevation: false,
  disableFocusRipple: false,
  disableRipple: false,
  size: 'medium',
  typography: {
    component: 'span'
  },
  buttonProps: {},
  styleProps: {}
}


export const buttonPropType = {
  component: PropTypes.any,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  colorDef: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  color: PropTypes.string,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  loading: PropTypes.bool,
  loadingProps: PropTypes.object,
  disabled: PropTypes.bool,
  disableElevation: PropTypes.bool,
  disableFocusRipple: PropTypes.bool,
  disableRipple: PropTypes.bool,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  buttonProps: PropTypes.object,
  styleProps: PropTypes.object,
  onClick: PropTypes.func,
  typography: PropTypes.shape({
    component: PropTypes.string,
    variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption']),
    fontWeight: PropTypes.oneOf(['normal', 'bold', 'bolder', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900]),
    textAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify', 'initial', 'inherit']),
    colorDef: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']),
    color: PropTypes.string
  })
}

Button.propTypes = {
  component: PropTypes.any,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  colorDef: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  color: PropTypes.string,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  loading: PropTypes.bool,
  loadingProps: PropTypes.object,
  disabled: PropTypes.bool,
  disableElevation: PropTypes.bool,
  disableFocusRipple: PropTypes.bool,
  disableRipple: PropTypes.bool,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  buttonProps: PropTypes.object,
  onClick: PropTypes.func,
  typography: PropTypes.shape({
    component: PropTypes.string,
    variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption']),
    fontWeight: PropTypes.oneOf(['normal', 'bold', 'bolder', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900]),
    textAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify', 'initial', 'inherit']),
    colorDef: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']),
    color: PropTypes.string
  })
}

export default Button
