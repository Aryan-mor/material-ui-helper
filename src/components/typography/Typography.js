import React, { forwardRef, useMemo } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Box from '../box/Box'
import { getSafe, gLog, ShowOnlyLg, ShowOnlyMd, ShowOnlySm, ShowOnlyXl, ShowOnlyXs } from '../../index'
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
  ({
     className,
     width,
     component,
     variant,
     fontWeight,
     lineHeight,
     textAlign,
     color,
     textDecorationBottom,
     ...props
   }, ref) => {
    const classes = textDecorationBottom ? useTypographyStyle({ textDecorationBottom }) : {}

    const style = useMemo(() => {
      return {
        color: color,
        fontWeight: fontWeight,
        textAlign: textAlign,
        lineHeight: lineHeight,
        ...props.style
      }
    }, [color, fontWeight, textAlign, props.style])

    return (
      <Box
        ref={ref}
        width={width}
        className={clsx([textDecorationBottom ? styles.hasBefore : '', classes.root, className])}
        component={_.isObject(variant) ? ResponsiveTypo : Typo}
        display={'flex'}
        cm={component}
        variant={variant}
        {...props}
        style={style}>
        {props.children}
      </Box>
    )
  })


function ResponsiveTypography({ variant, children, ...props }) {

  return (
    <React.Fragment>
      <ShowOnlyXs>
        <CM variant={variant['xs'] || variant['sm'] || variant['md'] || variant['lg'] || variant['xl']} {...props}>
          {children}
        </CM>
      </ShowOnlyXs>
      <ShowOnlySm>
        <CM variant={variant['sm'] || variant['md'] || variant['lg'] || variant['xl'] || variant['sm']}  {...props}>
          {children}
        </CM>
      </ShowOnlySm>
      <ShowOnlyMd>
        <CM variant={variant['md'] || variant['lg'] || variant['xl'] || variant['sm'] || variant['xs']}  {...props}>
          {children}
        </CM>
      </ShowOnlyMd>
      <ShowOnlyLg>
        <CM variant={variant['lg'] || variant['xl'] || variant['md'] || variant['sm'] || variant['xs']}  {...props}>
          {children}
        </CM>
      </ShowOnlyLg>
      <ShowOnlyXl>
        <CM variant={variant['xl'] || variant['lg'] || variant['md'] || variant['sm'] || variant['xs']}  {...props}>
          {children}
        </CM>
      </ShowOnlyXl>
    </React.Fragment>
  )

}


const Typography = React.forwardRef(({ variant, ...props }, ref) => {
  if (_.isObject(variant))
    return <ResponsiveTypography variant={variant} {...props} >{props.children}</ResponsiveTypography>

  return <CM variant={variant} {...props}>{props.children}</CM>
})

Typography.propTypes = {
  component: PropTypes.string,
  variant: PropTypes.oneOfType([PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption']), PropTypes.object]),
  fontWeight: PropTypes.oneOf(['normal', 'bold', 'bolder', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900]),
  textAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify', 'initial', 'inherit']),
  lineHeight: PropTypes.number,
  textSelectable: PropTypes.bool,
  color: PropTypes.string,
  textDecorationBottom: PropTypes.shape({
    color: PropTypes.any,
    width: PropTypes.any
  })
}

export default Typography
