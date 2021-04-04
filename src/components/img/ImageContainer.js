import React, { useEffect, useRef, useState } from 'react'
import Image from './image'
import styles from './imageContainer.css'
import useIntersectionObserver from '../../helper/useIntersectionObserver'
import { getSafe, tryIt, useEffectWithoutInit, useWindowSize } from '../..'
import Box from '../box/Box'

const imageSizeDef = { width: '100%', height: 'auto' }

let imgGroupKey = {}

const ImageContainer = ({
                          src,
                          thumb,
                          alt,
                          groupKey,
                          imageWidth,
                          imageHeight,
                          backupSrc,
                          autoSize,
                          renderTimeout = 0,
                          imageProps = {},
                          onIsVisible,
                          ...props
                        }) => {
  const [width] = useWindowSize()
  const ref = useRef()
  const [isVisible, setIsVisible] = useState(false)
  const [imageSize, setImageSize] = useState((groupKey && imgGroupKey[groupKey]) ? imgGroupKey[groupKey] : imageSizeDef)


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

  useEffectWithoutInit(() => {
    if (groupKey)
      imgGroupKey[groupKey] = undefined
    reRender(renderTimeout + 500)
  }, [width])

  useEffect(() => {
    reRender(renderTimeout + 500)
  }, [])

  function reRender(rTimeout = renderTimeout) {
    const imageSize = getSafe(() => {
      if (groupKey && imgGroupKey[groupKey]) return imgGroupKey[groupKey]
      return undefined
    })
    if (imageSize) {
      setImageSize(imageSize)
      return
    }

    setTimeout(() => {
      const imageSize = getSafe(() => {
        if (!autoSize || !(imageWidth && imageHeight))
          throw ''
        if (groupKey && imgGroupKey[groupKey]) return imgGroupKey[groupKey]
        if (imageWidth > imageHeight) {
          const offsetWidth = ref.current.offsetWidth
          const res = {
            width: '100%',
            height: (offsetWidth / imageWidth) * imageHeight
          }
          if (groupKey)
            imgGroupKey[groupKey] = res
          return res
        }
        const offsetHeight = ref.current.offsetHeight
        const res = {
          width: (offsetHeight / imageHeight) * imageWidth,
          height: '100%'
        }
        if (groupKey)
          imgGroupKey[groupKey] = res
        return res
      }, imageSizeDef)
      setImageSize(imageSize)
    }, rTimeout + 800)
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
    </Box>
  )
}

export default ImageContainer
