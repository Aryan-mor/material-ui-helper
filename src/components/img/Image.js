import React, { useEffect } from 'react'
import styles from './image.css'
import clsx from 'clsx'
import Skeleton from '@material-ui/lab/Skeleton'
import { zIndexComponent } from '../..'


const skeletonStyle = {
  width: '100%',
  height: '100%'
}


const Image = ({ src, thumb, alt, backupSrc, ...props }) => {
  const [isThumbLoaded, setIsThumbLoaded] = React.useState(!Boolean(thumb))
  const [thumbVisibility, setThumbVisibility] = React.useState(true)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [error, setError] = React.useState(!Boolean(src))

  useEffect(() => {
    if (!isLoaded)
      return
    const timeout = setTimeout(() => {
      if (thumbVisibility)
        setThumbVisibility(false)
    }, 1000)
    return()=>{
      clearTimeout(timeout)
    }
  }, [isLoaded])

  useEffect(() => {
    if (error !== Boolean(src))
      setError(!Boolean(src))
  }, [src])


  return (
    <React.Fragment>
      {
        ((!isLoaded && (!thumb || (thumb && !isThumbLoaded)))) &&
        <Skeleton variant={'rect'} style={skeletonStyle}/>
      }
      {
        ((thumbVisibility && thumb)) &&
        <img
          className={clsx([styles.image, styles.thumb])}
          alt={alt}
          src={thumb}
          onLoad={() => {
            setIsThumbLoaded(true)
          }}
          style={{
            position: 'absolute',
            visibility: isLoaded ? 'hidden' : 'visible'
          }}
        />
      }
      {
        isThumbLoaded &&
        <img
          onLoad={() => {
            setIsLoaded(true)
          }}
          onError={() => {
            setError(true)
          }}
          className={clsx([styles.image, styles.full])}
          style={{
            opacity: isLoaded ? 1 : 0,
            zIndex: zIndexComponent.img
          }}
          alt={alt}
          src={(error && backupSrc) ? backupSrc : src}
          {...props}
        />
      }
    </React.Fragment>
  )
}

export default Image
