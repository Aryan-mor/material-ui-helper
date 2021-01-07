import React, { useEffect } from 'react'
import styles from './image.css'
import clsx from 'clsx'
import Skeleton from '@material-ui/lab/Skeleton'
import Box from '../Box'



const skeletonStyle = {
  width: '100%',
  height: '100%'
}


const Image = ({src,thumb,alt,...props}) => {
  const [isThumbLoaded, setIsThumbLoaded] = React.useState(!Boolean(thumb))
  const [thumbVisibility, setThumbVisibility] = React.useState(true)
  const [isLoaded, setIsLoaded] = React.useState(false)

  useEffect(()=>{
    if (!isLoaded)
      return
    setTimeout(()=>{
      setThumbVisibility(false)
    },1000)
  },[isLoaded])

  return (
    <React.Fragment>
      {
        (!isLoaded && thumb && !isThumbLoaded) &&
        <Skeleton variant={'rect'} style={skeletonStyle}/>
      }
      {
        (thumbVisibility && thumb)&&
        <img
          className={clsx([styles.image, styles.thumb])}
          alt={alt}
          src={thumb}
          onLoad={() => {
            setIsThumbLoaded(true)
          }}
          style={{ visibility: isLoaded ? 'hidden' : 'visible' }}
        />
      }
      {
        isThumbLoaded &&
        <img
          onLoad={() => {
            setIsLoaded(true)
          }}
          className={clsx([styles.image, styles.full])}
          style={{
            opacity: isLoaded ? 1 : 0 ,
          }}
          alt={alt}
          src={src}
          {...props}
        />
      }
    </React.Fragment>
  )
}

export default Image
