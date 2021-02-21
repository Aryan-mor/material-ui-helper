import React, { useMemo } from 'react'
import { getSafe, gLog } from '../..'
import ImageContainer from './ImageContainer'
import PropTypes from 'prop-types'
import _ from 'lodash'

function Img({
               alt: al,
               src: sr,
               thumbnail: th,
               groupKey,
               autoSize,
               backupSrc,
               imageWidth,
               imageHeight,
               renderTimeout,
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
      groupKey={groupKey}
      renderTimeout={renderTimeout}
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
  autoSize: true,
  renderTimeout: 300
}


Img.propTypes = {
  imageWidth: PropTypes.any,
  imageHeight: PropTypes.any,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  renderTimeout: PropTypes.number,
  backupSrc: PropTypes.string,
  autoSize: PropTypes.bool,
  thumbnail: PropTypes.string,
  imageProps: PropTypes.object,
  groupKey:PropTypes.string,
  onIsVisible: PropTypes.func,
}

export default Img
