import React, { useEffect } from 'react'
import styles from './image.css'
import clsx from 'clsx'
import { isServer, zIndexComponent } from '../..'
import Skeleton from '../Skeleton'


/*
*
* isThumbLoaded = if Thumb loaded set 1 if error set 2 and default 0
* thumbVisibility = when image loaded after delay set false
* isLoaded = when image loaded set true
* error = if image error set 1 if backupSrc error set 2 default 0
* */

const Image = ({ src, thumb, alt, backupSrc, ...props }) => {
  const [isThumbLoaded, setIsThumbLoaded] = React.useState((isServer() || !Boolean(thumb)) ? 1 : 0)
  const [thumbVisibility, setThumbVisibility] = React.useState(!isServer())
  const [isLoaded, setIsLoaded] = React.useState(isServer())
  const [error, setError] = React.useState(src ? 0 : backupSrc ? 1 : 2)
  // const [serverSideError, setServerSideError] = React.useState(false)

  useEffect(() => {
    if (!isLoaded)
      return
    const timeout = setTimeout(() => {
      if (thumbVisibility)
        setThumbVisibility(false)
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [isLoaded])

  useEffect(() => {
    if (error !== Boolean(src))
      setError(!Boolean(src))
  }, [src])

  // useEffect(()=>{
  //   if (!serverSideError)
  //     return
  //
  //   setIsThumbLoaded( !Boolean(thumb))
  //   setThumbVisibility(true)
  //   setIsLoaded(false)
  //   setError(!Boolean(src))
  // },[serverSideError])
  //


  console.log('skajfkjkasjkfjaskjfkjsakjf', {
    isThumbLoaded,
    thumbVisibility,
    isLoaded,
    error,
    src,
    backupSrc,
    thumb
  })

  return (
    <React.Fragment>
      {
        (isThumbLoaded !== 2 && (thumbVisibility && thumb)) &&
        <img
          className={clsx([styles.image, styles.thumb])}
          alt={alt}
          src={thumb}
          onLoad={() => {
            setIsThumbLoaded(1)
          }}
          onError={() => {
            setIsThumbLoaded(2)
          }}
          style={{
            position: 'absolute',
            visibility: isLoaded ? 'hidden' : 'visible'
          }}
        />
      }
      {
        error !== 2 && isThumbLoaded !== 0 && (src || backupSrc) &&
        <img
          onLoad={() => {
            setIsLoaded(true)
          }}
          onError={() => {
            if (!backupSrc) {
              setError(2)
            }
            setError(error => error === 0 ? 1 : 2)
          }}
          className={clsx([styles.image, styles.full])}
          style={{
            opacity: isLoaded ? 1 : 0,
            zIndex: zIndexComponent.img
          }}
          alt={alt}
          src={(error === 1 && backupSrc) ? backupSrc : src}
          {...props}/>
      }
      {
        (error === 2 || (!isLoaded && (!thumb || (thumb && !isThumbLoaded)))) &&
        <Skeleton
          width={1}
          height={1}
          style={{
            position: 'absolute'
          }}/>
      }
    </React.Fragment>
  )
}

export default Image
