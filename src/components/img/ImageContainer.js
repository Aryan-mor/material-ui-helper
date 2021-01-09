import React, { useEffect, useRef, useState } from 'react'
import Image from './image'
import styles from './imageContainer.css'
import useIntersectionObserver from '../../helper/useIntersectionObserver'
import { getSafe, tryIt } from '../..'
import Box from '../Box'

const imageSizeDef = { width: '100%', height: 'auto' }
const ImageContainer = ({ src, thumb, alt, imageWidth, imageHeight,backupSrc, autoSize, imageProps = {}, onIsVisible, ...props }) => {
  const ref = useRef()
  const [isVisible, setIsVisible] = useState(false)
  const [imageSize, setImageSize] = useState(imageSizeDef)



  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          tryIt(() => onIsVisible())
          setIsVisible(true)
        }
        tryIt(()=>observerElement.unobserve(ref.current))
      }
    }
  })

  useEffect(() => {
    const imageSize = getSafe(() => {
      if (!autoSize || !(imageWidth && imageHeight))
        throw ''
      if (imageWidth > imageHeight) {
        const offsetWidth = ref.current.offsetWidth
        return {
          width: "100%",
          height: (offsetWidth / imageWidth) * imageHeight
        }
      }
      const offsetHeight = ref.current.offsetHeight
      return {
        width: (offsetHeight / imageHeight) * imageWidth,
        height: "100%"
      }
    }, imageSizeDef)

    setImageSize(imageSize)
  }, [imageWidth, imageWidth, ref])


  return (
    <Box
      ref={ref}
      display={'block'}
      className={styles.imageContainer}
      width={imageSize.width}
      height={imageSize.height}
      {...props}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...props.style
      }}>
      {isVisible && (
        <Image src={src} backupSrc={backupSrc} thumb={thumb} alt={alt} {...imageProps}/>
      )}
      <noscript>
        {`<img src="${src}" alt="${alt}" />`}
      </noscript>
    </Box>
  )
}

export default ImageContainer
