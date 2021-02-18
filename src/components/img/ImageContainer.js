import React, { useEffect, useRef, useState } from 'react'
import Image from './image'
import styles from './imageContainer.css'
import useIntersectionObserver from '../../helper/useIntersectionObserver'
import { getSafe, tryIt } from '../..'
import Box from '../box/Box'
import { useWindowSize } from '../../utils/Helper'

const imageSizeDef = { width: '100%', height: 'auto' }
const ImageContainer = ({ src, thumb, alt, imageWidth, imageHeight, backupSrc, autoSize, renderTimeout = 0, imageProps = {}, onIsVisible, ...props }) => {
  const [width] = useWindowSize()
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
        try {
          observerElement.unobserve(ref.current)
        } catch (e) {
        }
      }
    }
  })




  useEffect(() => {
  }, [imageWidth, imageWidth, ref])
  useEffect(()=>{
    reRender(renderTimeout+500)
  },[width])

  function reRender(rTimeout =renderTimeout) {
    setTimeout(() => {
      const imageSize = getSafe(() => {
        if (!autoSize || !(imageWidth && imageHeight))
          throw ''
        if (imageWidth > imageHeight) {
          const offsetWidth = ref.current.offsetWidth
          return {
            width: '100%',
            height: (offsetWidth / imageWidth) * imageHeight
          }
        }
        const offsetHeight = ref.current.offsetHeight
        return {
          width: (offsetHeight / imageHeight) * imageWidth,
          height: '100%'
        }
      }, imageSizeDef)
      setImageSize(imageSize)
    }, rTimeout)
  }


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
