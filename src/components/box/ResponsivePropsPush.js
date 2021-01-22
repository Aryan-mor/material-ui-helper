import React, { useMemo } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { getSafe, UtilsObject } from '../..'

function ResponsivePropsPush({ baseWidth,width, responsiveProps, children, ...props }) {

  const { xs = {}, sm = {}, md = {}, lg = {}, xl = {} } = responsiveProps


  const responsivePr = useMemo(() => {
    return getSafe(() => {

      if (isWidthUp('xl', width)) {
        return UtilsObject.smartAssign(props,xs,sm,md,lg,xl)
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
        return UtilsObject.smartAssign(props,xs,sm,md,lg)
        return {
          ...props,
          ...xs,
          ...sm,
          ...md,
          ...lg
        }
      }
      if (isWidthUp('md', width)) {
        return UtilsObject.smartAssign(props,xs,sm,md)
        return {
          ...props,
          ...xs,
          ...sm,
          ...md
        }
      }
      if (isWidthUp('sm', width)) {
        return UtilsObject.smartAssign(props,xs,sm)
        return {
          ...props,
          ...xs,
          ...sm
        }
      }
      if (isWidthUp('xs', width)) {
        return UtilsObject.smartAssign(props,xs)
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

