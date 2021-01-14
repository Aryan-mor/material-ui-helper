import React, { useMemo } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { getSafe, gLog } from '../..'

function ResponsivePropsPush({ baseWidth,width, responsiveProps, children, ...props }) {

  const { xs = {}, sm = {}, md = {}, lg = {}, xl = {} } = responsiveProps


  const responsivePr = useMemo(() => {
    return getSafe(() => {
      gLog("asfklkasjkfjkjas",props)
      if (isWidthUp('xl', width)) {
        return {
          ...props,
          ...xs,
          ...sm,
          ...md,
          ...lg,
          ...xl
        }
      }
      if (isWidthUp('lg', width)) {
        return {
          ...props,
          ...xs,
          ...sm,
          ...md,
          ...lg
        }
      }
      if (isWidthUp('md', width)) {
        return {
          ...props,
          ...xs,
          ...sm,
          ...md
        }
      }
      if (isWidthUp('sm', width)) {
        return {
          ...props,
          ...xs,
          ...sm
        }
      }
      if (isWidthUp('xs', width)) {
        return {
          ...props,
          ...xs
        }
      }
      throw ''
    }, {})
  }, [width, responsiveProps])

  return (
    !_.isEmpty(responsivePr) ?
      React.cloneElement(children, {
        width:baseWidth,
        ...responsivePr
      }) :
      React.cloneElement(children, {width:baseWidth, ...props })
  )
}

export default withWidth()(ResponsivePropsPush)

