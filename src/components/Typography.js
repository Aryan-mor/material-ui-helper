import React, { forwardRef, useEffect, useState } from 'react'
import Tp from '@material-ui/core/Typography'
import _ from 'lodash'
import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PropTypes from 'prop-types'
import Box, { boxPropType } from './Box'
import Box2 from '../Box2'

function ResponsiveTypo({ children, variant: vari, ...props }) {
  const theme = useTheme()
  const screenSize = {
    xs: useMediaQuery(theme.breakpoints.down('xs')),
    sm: useMediaQuery(theme.breakpoints.down('sm')),
    md: useMediaQuery(theme.breakpoints.down('md')),
    lg: useMediaQuery(theme.breakpoints.down('lg')),
    xl: useMediaQuery(theme.breakpoints.down('xl'))
  }
  const [variant, setVariant] = useState(updateVariant(true))


  useEffect(() => {
    updateVariant()
  }, [vari])

  function updateVariant(returnValue) {
    const { xs, sm, md, lg, xl } = vari
    let res = (xs || sm || md || lg || xl)

    if (screenSize.sm) {
      res = (sm || md || lg || xl || xs)
    } else if (screenSize.md) {
      res = (md || lg || xl || sm || xs)
    } else if (screenSize.lg) {
      res = (lg || xl || md || sm || xs)
    } else if (screenSize.xl) {
      res = (xl || lg || md || sm || xs)
    }

    if (returnValue)
      return res

    setVariant(res)
  }

  return (
    <Typo variant={variant} {...props}>
      {children}
    </Typo>
  )
}

function Typo({ cm = 'div', children, variant, ...props }) {

  const theme = useTheme()

  return (
    <Tp component={cm} variant={variant} {...props}>
      {children}
    </Tp>
  )
}

const CM = forwardRef(
  ({ component, variant, fontWeight,textAlign, ...props }, ref) => (
    <Box
      ref={ref}
      component={_.isObject(variant) ? ResponsiveTypo : Typo}
      display={'flex'}
      cm={component}
      variant={variant}
      {...props}
      style={{
        fontWeight: fontWeight,
        textAlign:textAlign,
        ...props.style
      }}>
      {props.children}
    </Box>
  ))

export default function Typography(props) {
  return <CM {...props}>{props.children}</CM>
}

export const typographyPropTypes = {
  component: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption']),
  fontWeight: PropTypes.oneOf(['normal', 'bold', 'bolder', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900]),
  textAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify', 'initial', 'inherit']),
  ...boxPropType
}

Typography.propTypes = typographyPropTypes
