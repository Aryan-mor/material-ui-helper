import _ from 'lodash'

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

export const isServer = () => !process.browser;

export const isClient = () => process.browser;

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  return this.replace(regex, to)
}
String.prototype.trimAll = function() {
  return this.replaceAll(/ /g, '').trim()
}
//endregion string
