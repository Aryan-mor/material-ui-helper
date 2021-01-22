import { makeStyles } from '@material-ui/styles'
import React, { useCallback, useMemo, useState } from 'react'
import clsx from 'clsx'
import { getSafe } from '../..'


const useBoxHoverStyles = makeStyles({
  hoverStyleGenerator: props => ({
    '&:hover': {
      ...props.hoverStyle
    }
  })
})

function HoverProps({hoverProps, children, ...props}) {

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
        ...(hover ? hoverProps : {}),
        style: {
          ...(getSafe(() => hoverProps.style, {}))
        },
        onMouseEnter: handleOnMouseEnter,
        onMouseLeave: handleOnMouseLeave,
        className: hoverProps.className
      }
    }, {})
  }, [hover, hoverProps])


  return (
    React.cloneElement(children, {
      ...props,
      ...hovProps,
      className: clsx([getSafe(() => hovProps.className, ""), getSafe(() => props.className, "")]),
      style: {
        ...getSafe(()=>props.style,{}),
        ...getSafe(()=>hovProps.style,{})
      }
    })
  )
}


export default HoverProps
