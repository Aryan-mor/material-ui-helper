import React from 'react'
import Box from '../box/Box'
import PropTypes from 'prop-types'
import Img from './Img'
import styles from '../styles.module.css'


function SquareImg({
                     src,
                     alt,
                     size,
                     align: al,
                     imageWidth,
                     imageHeight,
                     imageProps,
                     ...props
                   }) {
  const align = al === 'end' ? 'flex-end' : al === 'start' ? 'flex-start' : al

  return (
    <Box
      className={styles.squareImgContainer}
      {...props}
      style={{
        maxWait: size,
        maxHeight: size,
        overflow: 'hidden',
        ...props.style
      }}>
      <Img
        src={src}
        alt={alt}
        display={'flex'}
        alignItems={align}
        justifyContent={align}
        imageProps={{
          ...imageProps,
          style: {
            ...imageProps?.style,
            width: imageWidth > imageHeight ? 'auto' : '100%',
            height: imageWidth > imageHeight ? '100%' : 'auto'
          }
        }}/>
    </Box>
  )
}

SquareImg.defaultProps = {
  align: 'center',
  imageProps: {}
}

SquareImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  imageProps: PropTypes.object,
  size: PropTypes.any,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  align: PropTypes.oneOf(['start', 'center', 'end'])
}

export default SquareImg