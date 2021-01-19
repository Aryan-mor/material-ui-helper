import React, { useMemo } from 'react'
import { getSafe, gLog } from '../..'
import ImageContainer from './ImageContainer'
import PropTypes from 'prop-types'


function Img({
               alt: al,
               src: sr,
               thumbnail: th,
               autoSize,
               backupSrc,
               imageWidth,
               imageHeight,
               imageProps,
               onIsVisible,
               ...props
             }) {

  const src = useMemo(() => _.isObject(sr) ? sr.image : sr, [sr])
  const alt = useMemo(() => {
    return getSafe(() => {
      if (al) {
        return al
      }
      if (_.isObject(src)) {
        return src.title || src.name
      }

      throw ''
    }, '')
  }, [al, sr])

  const thumbnail = useMemo(() => {
    return getSafe(() => {
      if (th)
        return th
      if (src.match('(http|https).*\\-has\\-ph\\.(jpg|png)')) {
        return src.replace('-has-ph', '-ph')
      }
    })
  }, [src, th])



  return (
    <ImageContainer
      src={src}
      thumb={thumbnail}
      alt={alt}
      backupSrc={backupSrc}
      autoSize={autoSize}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
      imageProps={imageProps}
      onIsVisible={onIsVisible}
      {...props}/>
  )
}


Img.defaultProps = {
  autoSize: true
}


Img.propTypes = {
  imageWidth: PropTypes.any,
  imageHeight: PropTypes.any,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  backupSrc: PropTypes.string,
  autoSize: PropTypes.bool,
  thumbnail: PropTypes.string,
  imageProps: PropTypes.object,
  onIsVisible: PropTypes.func
}

export default Img
