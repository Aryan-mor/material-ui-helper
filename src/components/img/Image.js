import React, { useEffect } from 'react'
import styles from './image.css'
import clsx from 'clsx'
import { isServer, zIndexComponent } from '../..'
import Skeleton from '../Skeleton'


const Image = ({ src, thumb, alt, backupSrc, ...props }) => {
  const [isThumbLoaded, setIsThumbLoaded] = React.useState(isServer() || !Boolean(thumb))
  const [thumbVisibility, setThumbVisibility] = React.useState(true)
  const [isLoaded, setIsLoaded] = React.useState(isServer())
  const [error, setError] = React.useState(!Boolean(src))

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


  return (
    <React.Fragment>
      {
        ((thumbVisibility && thumb)) &&
        <img
          className={clsx([styles.image, styles.thumb])}
          alt={alt}
          src={thumb}
          onLoad={() => {
            setIsThumbLoaded(true)
          }}
          onError={()=>{
            setIsThumbLoaded(true)
          }}
          style={{
            position: 'absolute',
            visibility: isLoaded ? 'hidden' : 'visible'
          }}
        />
      }
      {
        isThumbLoaded && (src || backupSrc) &&
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
          {...props}/>
      }
      {
        ((!isLoaded && (!thumb || (thumb && !isThumbLoaded)))) &&
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
