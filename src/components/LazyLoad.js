import React, { useRef, useState } from 'react'
import useIntersectionObserver from '../helper/useIntersectionObserver'
import { isServer } from '../index'
import Box from './box/Box'
import PropTypes from 'prop-types'
import Fade from '@material-ui/core/Fade'

function LazyLoad({ serverSideRender, children, transition,rootMarginOffset, onIsVisible, ...props }) {
  const ref = useRef()
  const [isVisible, setIsVisible] = useState(false)

  useIntersectionObserver({
    target: ref,
    rootMargin:`${rootMarginOffset}px`,
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
        (isVisible || (serverSideRender && isServer())) ?
        ( transition && !(serverSideRender && isServer())) ?
          <Fade in={true}
                timeout={600}>
            {children}
          </Fade> :
          children:
          <React.Fragment/>
      }
    </Box>
  )
}

LazyLoad.defaultProps = {
  serverSideRender: true,
  transition: true,
  rootMarginOffset:250
}

LazyLoad.propTypes = {
  serverSideRender: PropTypes.bool,
  transition: PropTypes.bool,
  rootMarginOffset: PropTypes.number,
  onIsVisible: PropTypes.func
}

export default LazyLoad
