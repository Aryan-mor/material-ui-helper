import React, { useEffect, useLayoutEffect, useState } from 'react'
import _ from 'lodash'
import { UtilsString } from './Utils'
import { useTheme } from '@material-ui/core'

//region functions
export const toNumberSafe = (x) => {
  return isNumeric(x) ? _.toNumber(x) : x
}

export const tryIt = (fun, defaultVal) => {
  try {
    return fun()
  } catch (e) {
    return _.isFunction(defaultVal) ? defaultVal() : defaultVal
  }
}

export const getSafe = (fun, defaultVal) => tryIt(fun, defaultVal)

export const isServer = () => getSafe(() => !process.browser, false)

export const isClient = () => getSafe(() => process.browser, false)

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


export function useWindowSize(wait = 2000, useBreakpoints = true) {
  const theme = useTheme()
  const [size, setSize] = useState([0, 0,{}])
  useEffect(() => {
    function updateSize() {
      let breakpoints = {}
      const width = window.innerWidth
      tryIt(() => {
        if (useBreakpoints) {
          const isXl = theme.breakpoints.width('xl') <= width
          const isLg = theme.breakpoints.width('lg') <= width
          const isMd = theme.breakpoints.width('md') <= width
          const isSm = theme.breakpoints.width('sm') <= width
          const isXs = theme.breakpoints.width('xs') <= width
          breakpoints = {
            isXl,
            isLg,
            isMd,
            isSm,
            isXs,
            xsDown: isXs,
            smDown: isXs || isSm,
            mdDown: isXs || isSm || isMd,
            lgDown: isXs || isSm || isMd || isLg,
            xlDown: isXs || isSm || isMd || isLg || isXl,
            xlUp: isXl,
            lgUp: isXl || isLg,
            mdUp: isXl || isLg || isMd,
            smUp: isXl || isLg || isMd || isSm,
            xsUp: isXl || isLg || isMd || isSm || isXs
          }
        }
      })

      tryIt(() => setSize([
        width,
        window.innerHeight,
        breakpoints
      ]))
    }
    window.addEventListener('resize', _.debounce(function() {
      updateSize()
    }, wait))
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

//endregion functions

//region log
export const gLog = (...t) => {
  if (process.env.REACT_APP_MATERIAL_HELPER_LOGGER === 'false')
    return
  console.log(...t)
}

export const gError = (...t) => {
  if (process.env.REACT_APP_MATERIAL_HELPER_LOGGER === 'false')
    return
  console.error(...t)
}
//endregion log

//region checker
export const isNumeric = (x) => {
  if (x === '') {
    return false
  }
  return !(isNaN(x)) && (typeof x !== 'object') && (x !== Number.POSITIVE_INFINITY) && (x !== Number.NEGATIVE_INFINITY)
}
export const isElement = (element) => {
  return React.isValidElement(element)
}
//endregion checker

//region string
String.prototype.replaceAll = function(regex, to) {
  return UtilsString.replaceAll(this, regex, to)
}
String.prototype.trimAll = function() {
  return UtilsString.trimAll(this)
}
String.prototype.replaceAt = function(index, replacement) {
  return UtilsString.replaceAt(this, index, replacement)
}
String.prototype.replaceAtTo = function(startIndex, endIndex, replacement) {
  return UtilsString.replaceAtTo(this, startIndex, endIndex, replacement)
}
String.prototype.spaceWithPattern = function(pattern) {
  return UtilsString.spaceWithPattern(this, pattern)
}
//endregion string


export const zIndexComponent = {
  img: 4
}

