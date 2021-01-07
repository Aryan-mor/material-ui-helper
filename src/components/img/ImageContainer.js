import React from 'react'
import Image from './image'
import styles from './imageContainer.css'
import useIntersectionObserver from '../../helper/useIntersectionObserver'
import { tryIt } from '../..'
import Box from '../Box'

const ImageContainer = ({ src, thumb, alt, width, height,imageProps={}, onIsVisible, ...props }) => {
  const ref = React.useRef()
  const [isVisible, setIsVisible] = React.useState(false)

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          tryIt(() => onIsVisible())
          setIsVisible(true)
        }
        observerElement.unobserve(ref.current)
      }
    }
  })

  return (
    <Box
      ref={ref}
      className={styles.imageContainer}
      width={width}
      height={height}
      {...props}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...props.style
      }}>
      {isVisible && (
        <Image src={src} thumb={thumb} alt={alt} {...imageProps}/>
      )}
      <noscript>
        <img src={src} alt={alt} width={width} height={height}/>
      </noscript>
    </Box>
  )
}

export default ImageContainer
