import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import useIntersectionObserver, { useIntersectionObserver2 } from '../helper/useIntersectionObserver'
import { getSafe, gLog, isServer, tryIt } from '../index'
import Box from './Box'
import PropTypes from 'prop-types'
import Fade from '@material-ui/core/Fade'

function LazyLoad({ serverSideRender, children, transition, onIsVisible, ...props }) {
  const ref = useRef()
  const [isVisible, setIsVisible] = useState(false)
  const [transitionEnd, setTransitionEnd] = useState(false)

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          setIsVisible(true)
        }
        try {
          observerElement.unobserve(ref.current)
        }catch (e) {
        }
      }
    }
  })

  return (
    <Box ref={ref}
         {...props}>
      {
        ((isVisible || (serverSideRender && isServer()))) &&
        (!transitionEnd && transition && !(serverSideRender && isServer())) ?
          <Fade in={true}
                timeout={600}
                onEnter={() => {
                  if (!transitionEnd)
                    setTimeout(() => {
                      setTransitionEnd(true)
                    }, 300)
                }}>
            {children}
          </Fade> :
          children
      }
    </Box>
  )
}

LazyLoad.defaultProps = {
  serverSideRender: true,
  transition: true,
}

LazyLoad.propTypes = {
  serverSideRender: PropTypes.bool,
  transition: PropTypes.bool,
  onIsVisible: PropTypes.func
}

export default LazyLoad
