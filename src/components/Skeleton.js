import React from 'react'
import PropTypes from 'prop-types'
import Box from './box/Box'
import MaterialSkeleton from '@material-ui/lab/Skeleton'
import { UtilsStyle } from '..'


const defaultSkeletonStyle = {
  maxWidth: 'unset',
  display: 'block'
}
export default function Skeleton({ variant, width, height, borderRadius, ...props }) {

  return (
    <Box
      variant={variant}
      width={width}
      component={MaterialSkeleton}
      {...props}
      style={{
        height: height === 1 ? '100%' : height,
        ...UtilsStyle.borderRadius(borderRadius),
        ...defaultSkeletonStyle,
        ...props.style
      }}/>)
}

Skeleton.defaultProps = {
  variant: 'rect',
  width: 1,
  height: 1,
  borderRadius: 5
}

Skeleton.propTypes = {
  component: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['text', 'circle', 'rect']),
  borderRadius: PropTypes.any
}
