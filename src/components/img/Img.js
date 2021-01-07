import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getSafe, tryIt } from '../..'
import Box from '../Box'
import Skeleton from '@material-ui/lab/Skeleton'
import ImageContainer from './ImageContainer'
import PropTypes from 'prop-types'


function Img({ alt: al, src: sr, thumbnail: th, width , height ,imageProps,onIsVisible,...props}) {

  const src = useMemo(() => _.isObject(sr) ? sr.image : sr, [sr])
  const alt = useMemo(() => {
    return getSafe(() => {
      if (al) {
        return al
      }
      if (_.isObject(src)) {
        return src.title || src.name
      }

      throw ""
    },"")
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
      width={width}
      height={height}
      imageProps={imageProps}
      onIsVisible={onIsVisible}
      {...props}/>
  )
}



Img.defaultProps = {
  width:"100%",
  height:"100%"
}


Img.propTypes={
  width:PropTypes.any,
  height:PropTypes.any,
  alt:PropTypes.string,
  src:PropTypes.string,
  thumbnail:PropTypes.string,
  imageProps:PropTypes.object,
  onIsVisible:PropTypes.func,
}

export default Img;
