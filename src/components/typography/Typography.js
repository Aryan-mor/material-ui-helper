import React, { forwardRef, useMemo } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Box from '../box/Box'
import { getSafe } from '../../index'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import styles from '../../styles.module.css'
import ResponsiveTypo from './ResponsiveTypo'
import Typo from './DefaultTypo'

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

const CM = forwardRef(
  ({ className, width, component, variant, fontWeight, textAlign, color, textDecorationBottom, ...props }, ref) => {
    const classes = textDecorationBottom ? useTypographyStyle({ textDecorationBottom }) : {}

    const style = useMemo(() => {
      return {
        color: color,
        fontWeight: fontWeight,
        textAlign: textAlign,
        ...props.style
      }
    }, [color, fontWeight, textAlign, props.style])

    return (
      <Box
        ref={ref}
        baseWidth={width}
        className={clsx([textDecorationBottom ? styles.hasBefore : '', classes.root, className])}
        component={_.isObject(variant) ? ResponsiveTypo : Typo}
        display={'flex'}
        cm={component}
        variant={variant}
        margin={true}
        {...props}
        style={style}>
        {props.children}
      </Box>
    )
  })

function Typography({ mt, ml, mb, mr, mx, my, m, ...props }) {
  return <CM margin={{ mt, ml, mb, mr, mx, my, m }} {...props}>{props.children}</CM>
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
