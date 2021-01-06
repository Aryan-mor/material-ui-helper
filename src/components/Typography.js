import React, { forwardRef, useEffect, useState } from 'react'
import Tp from '@material-ui/core/Typography'
import _ from 'lodash'
import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PropTypes from 'prop-types'
import Box from './Box'
import { getSafe } from '..'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import styles from '../styles.module.css'


const useTypographyStyle = makeStyles({
  root: props => ({
    position: 'relative',
    '&:before': {
      content: '',
      position: 'absolute',
      right: 0,
      left: 0,
      bottom: 0,
      borderBottom: `${getSafe(() => (_.isNumber(props.textDecorationBottom.width) ? `${props.textDecorationBottom.width}px` : props.textDecorationBottom.width) || '2px', '2px')} solid ${getSafe(() => props.textDecorationBottom.color || '#000', '#000')}`
    }
  })
})


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
  ({ className, component, variant, fontWeight, textAlign, color, textDecorationBottom, ...props }, ref) => {
    const classes = textDecorationBottom ? useTypographyStyle({ textDecorationBottom }) : {}


    return (
      <Box
        ref={ref}
        className={clsx([styles.hasBefore, classes.root, className])}
        component={_.isObject(variant) ? ResponsiveTypo : Typo}
        display={'flex'}
        cm={component}
        variant={variant}
        {...props}
        style={{
          color: color,
          fontWeight: fontWeight,
          textAlign: textAlign,
          ...props.style
        }}>
        {props.children}
      </Box>
    )
  })

function Typography(props) {
  return <CM {...props}>{props.children}</CM>
}


Typography.propTypes = {
  component: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption']),
  fontWeight: PropTypes.oneOf(['normal', 'bold', 'bolder', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900]),
  textAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify', 'initial', 'inherit']),
  textSelectable: PropTypes.bool,
  color: PropTypes.string,
  textDecorationBottom: PropTypes.shape({
    color: PropTypes.string,
    width: PropTypes.string
  })
}

export default Typography
