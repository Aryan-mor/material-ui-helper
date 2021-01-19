import React, { useMemo } from 'react'
import { getSafe, UtilsObject } from '../..'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core'

function ResponsivePropsPush({ baseWidth, width, responsiveProps, children, ...props }) {
  const theme = useTheme()
  const { xs = {}, sm = {}, md = {}, lg = {}, xl = {} } = responsiveProps
const isXl = useMediaQuery(theme.breakpoints.up('xl'))
const isLg = useMediaQuery(theme.breakpoints.up('lg'))
const isMd = useMediaQuery(theme.breakpoints.up('md'))
const isSm = useMediaQuery(theme.breakpoints.up('sm'))
const isXs = useMediaQuery(theme.breakpoints.up('xs'))

  const responsivePr = useMemo(() => {
    return getSafe(() => {
      if (isXl) {
        return UtilsObject.smartAssign(props, xs, sm, md, lg, xl)
        return {
          ...props,
          ...xs,
          ...sm,
          ...md,
          ...lg,
          ...xl
        }
      }
      if (isLg) {
        return UtilsObject.smartAssign(props, xs, sm, md, lg)
        return {
          ...props,
          ...xs,
          ...sm,
          ...md,
          ...lg
        }
      }
      if (isMd) {
        return UtilsObject.smartAssign(props, xs, sm, md)
        return {
          ...props,
          ...xs,
          ...sm,
          ...md
        }
      }
      if (isSm) {
        return UtilsObject.smartAssign(props, xs, sm)
        return {
          ...props,
          ...xs,
          ...sm
        }
      }
      if (isXs) {
        return UtilsObject.smartAssign(props, xs)
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
      React.cloneElement(children,responsiveProps) :
      React.cloneElement(children, props)
  )
}

export default ResponsivePropsPush

