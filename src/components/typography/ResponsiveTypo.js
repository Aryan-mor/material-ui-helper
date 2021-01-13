import { useTheme } from '@material-ui/core'
import React, { useMemo } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { getSafe } from '../..'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Typo from './DefaultTypo'

function ResponsiveTypo({ width, children, variant: vari = {}, ...props }) {
  const theme = useTheme()
  const { xs, sm, md, lg, xl } = vari


  const variant = useMemo(() => {
    return getSafe(() => {

      if (isWidthUp('xl', width)) {
        return xl || lg || md || sm || xs
      }
      if (isWidthUp('lg', width)) {
        return lg || md || sm || xs
      }
      if (isWidthUp('md', width)) {
        return md || sm || xs
      }
      if (isWidthUp('sm', width)) {
        return sm || xs
      }
      if (isWidthUp('xs', width)) {
        return xs
      }
      throw ''
    }, (xs || sm || md || lg || xl))
  }, [width, vari])


  // const variant = useMemo(() => {
  //   const screenSize = {
  //     xs: useMediaQuery(theme.breakpoints.down('xs')),
  //     sm: useMediaQuery(theme.breakpoints.down('sm')),
  //     md: useMediaQuery(theme.breakpoints.down('md')),
  //     lg: useMediaQuery(theme.breakpoints.down('lg')),
  //     xl: useMediaQuery(theme.breakpoints.down('xl'))
  //   }
  //
  //   const { xs, sm, md, lg, xl } = vari
  //   let res = (xs || sm || md || lg || xl)
  //   if (screenSize.sm) {
  //     res = (sm || md || lg || xl || xs)
  //   } else if (screenSize.md) {
  //     res = (md || lg || xl || sm || xs)
  //   } else if (screenSize.lg) {
  //     res = (lg || xl || md || sm || xs)
  //   } else if (screenSize.xl) {
  //     res = (xl || lg || md || sm || xs)
  //   }
  //   return res
  // }, [vari])


  return (
    <Typo variant={variant} {...props}>
      {children}
    </Typo>
  )
}


export default withWidth()(ResponsiveTypo)
