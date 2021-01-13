import { makeStyles } from '@material-ui/styles'
import React, { useCallback, useMemo, useState } from 'react'
import clsx from 'clsx'
import { isWidthUp } from '@material-ui/core'
import withWidth from '@material-ui/core/withWidth'
import { getSafe } from '../..'

const useBoxHoverStyles = makeStyles({
  hoverStyleGenerator: props => ({
    '&:hover': {
      ...props.hoverStyle
    }
  })
})

function hoverProps({ hoverProps, children, ...props }) {

  const [hover, setHover] = useState(false)

  const handleOnMouseEnter = useCallback((e) => {
    setHover(true)
    getSafe(() => props.onMouseEnter(e))
  }, [])

  const handleOnMouseLeave = useCallback((e) => {
    setHover(false)
    getSafe(() => props.onMouseLeave(e))
  }, [])

  const hovProps = useMemo(() => {
    return getSafe(() => {
      if (!hoverProps)
        throw ''
      return {
        ...props,
        ...(hover ? hoverProps : {}),
        style: {
          ...props.style,
          ...(getSafe(() => hoverProps.style, {}))
        },
        onMouseEnter: handleOnMouseEnter,
        onMouseLeave: handleOnMouseLeave,
        className: clsx([hover ? (hoverProps.className) : '', props.className])
      }
    }, props)
  }, [hover, hoverProps])


  return (
    React.cloneElement(children, hovProps)
  )
}

export default withWidth()(hoverProps)
