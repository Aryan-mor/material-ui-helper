import React from 'react'
import PropTypes from 'prop-types'
import Box from './box/Box'
import MaterialSkeleton from '@material-ui/lab/Skeleton'


const defaultSkeletonStyle = {
  maxWidth:"unset",
  display:'block'
}
export default function Skeleton({variant,width,height, ...props }) {

  return (
    <Box
      variant={variant}
      width={width}
      height={height}
      component={MaterialSkeleton}
      {...props}
      style={{
        height:height,
        ...defaultSkeletonStyle,
        ...props.style
      }}/>)
}

Skeleton.defaultProps = {
  variant: 'rect',
  width:1
}

Skeleton.propTypes = {
  component: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant:PropTypes.oneOf(["text","circle","rect"])
}
