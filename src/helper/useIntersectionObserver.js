import React, { useEffect } from 'react'
import { getSafe, gLog, tryIt } from '..'

const useIntersectionObserver = ({
                                   target,
                                   onIntersect,
                                   threshold = 0.01,
                                   rootMargin = '0px'
                                 }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold
    })

    const current = target.current

    observer.observe(current)

    return () => {
      try {
        observer.unobserve(current)
      } catch (e) {
      }
    }
  })
}

export default useIntersectionObserver


export const useIntersectionObserver2 = ({
                                           target,
                                           onIntersect,
                                           threshold = 0,
                                           rootMargin = '0px 0px -100%'
                                         }) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold
    })

    const current = target.current

    observer.observe(current)

    return () => {
      observer.unobserve(current)
    }
  })
}
