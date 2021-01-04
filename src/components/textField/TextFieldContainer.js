import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { checkHasErrorPatternArray, isRTL } from '../../utils/Checker'
import _ from 'lodash'
import PropTypes from 'prop-types'
import DefaultTextField from './DefaultTextField'
import { getSafe, gLog } from '../..'

export const errorList = ['این فیلد اجباری است.']

const siteDir = 'rtl'
export const notValidTextField = 'textfield-not-valid'
export const notValidErrorTextField = 'textfield-not-valid-error-text'
export const textFieldInitialize = 'initialize'
export const textFieldNewValue = 'new-value'
export const textFieldRenderValue = 'render-value'
export const textFieldActived = 'actived'
let timer = {}
let onChangeTimer = {}
let returnValueTimer = {}

function getDirType(type) {
  try {
    if (!type)
      return undefined
    switch (type) {
      case 'number':
      case 'password':
        return 'ltr'
    }
  } catch (e) {
  }
  return undefined
}

function TextFieldContainer(pr) {
  const {
    name,
    defaultValue,
    errorPatterns = [],
    renderGlobalErrorText,
    actived,
    onChange,
    onChangeDelay,
    returnValue,
    render,
    type,
    checkInterval = 1000,
    dir: d,
    ...props
  } = pr


  const ref = useRef()
  const [error, setError] = useState(-1)
  const [dir, setDir] = useState(d ? d : siteDir)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    // checkDir(defaultValue);
    return () => {
      clearTimeout(timer[name])
      _.remove(timer, (v, k) => k === name)
      clearTimeout(onChangeTimer[name])
      _.remove(onChangeTimer, (v, k) => k === name)
      clearTimeout(returnValueTimer[name])
      _.remove(returnValueTimer, (v, k) => k === name)
    }
  }, [])

  useEffect(() => {
    try {
      if (actived === undefined) {
        ref.current.removeAttribute(textFieldActived)
        return
      }
      ref.current.setAttribute(textFieldActived, _.toString(actived))
    } catch (e) {

    }
  }, [actived])


  useLayoutEffect(() => {
    try {
      if (!ref.current)
        return
      //region init
      let el = ref.current
      el.hasError = () => {
        return el.getAttribute(notValidTextField)
      }
      el.setValue = handleSetValue
      if (el.required && !el.value) {
        setAttr(0)
      }
      checkDir(defaultValue)
      ref.current.setAttribute('inputType', type)
      //endregion init


      el.addEventListener('keyup', keyUp)
      el.addEventListener('blur', onFocused)

      const config = { attributes: true, childList: true, subtree: true }
      const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
          switch (mutation.attributeName) {
            case 'value':
            case textFieldNewValue: {
              keyUp()
              return
            }
            case 'required':
            case 'disabled':
            case 'type':
              keyDown()
              return
          }
        }
      }

      const observer = new MutationObserver(callback)
      observer.observe(el, config)

      return () => {
        observer.disconnect()
        el.removeEventListener('keyup', keyUp)
        el.removeEventListener('blur', onFocused)
      }
    } catch (e) {
    }
  }, [])

  function keyUp() {
    try {
      const el = ref.current
      if (el.value === el.getAttribute(textFieldNewValue))
        return
      ref.current.setAttribute(textFieldNewValue, el.value)
      let value = el.value
      if (returnValue) {
        value = returnValue(el.value)
        clearTimeout(returnValueTimer[name])
        returnValueTimer[name] = setTimeout(() => {
          el.setAttribute(textFieldRenderValue, value)
        }, 1000)
      }
      if (onChange) {
        if (onChangeDelay) {
          clearTimeout(onChangeTimer[name])
          onChangeTimer[name] = setTimeout(() => {
            onChange( el,value, { error })
          }, onChangeDelay)
        } else {
          onChange(el,value, el)
        }
      }
      keyDown()
    } catch (e) {

    }
  }

  function onFocused(e) {
    setFocused(true)
  }

  function keyDown() {
    let el = ref.current

    clearTimeout(timer[name])
    if (el.value.length === 1)
      checkDir(el.value)
    try {
      if (ref.current.required && (ref.current.value.length === 0 || ref.current.hasError() === '0')) {
        handleOnChange()
        return
      }
    } catch (e) {
    }
    timer[name] = setTimeout(() => handleOnChange(), checkInterval)
  }

  function handleOnChange() {
    try {
      const value = ref.current.value
      const isRequired = ref.current.required
      let error = ref.current.disabled ? -2 : (ref.current.required && !value) ? 0 : -1
      if (error === -1) {
        const check = checkHasErrorPatternArray(errorPatterns, value, ref)
        error = check === -1 ? error : check + isRequired ? 1 : 0
      }
      setError(error)
      setAttr(error)
      checkDir()
    } catch (e) {
    }
  }

  function setAttr(error) {
    if (!ref.current.attributes[textFieldInitialize]) {
      ref.current.setAttribute(textFieldInitialize, 'true')
    }
    if (error <= -1) {
      ref.current.removeAttribute(notValidTextField)
      ref.current.removeAttribute(notValidErrorTextField)
      return
    }
    ref.current.setAttribute(notValidTextField, error)
    try {
      const errorText = renderGlobalErrorText(error)
      if (!errorText) {
        throw 'errorText error'
      }
      ref.current.setAttribute(notValidErrorTextField, errorText)
    } catch (e) {
      ref.current.removeAttribute(notValidErrorTextField)
    }
  }

  function handleSetValue(text) {
    ref.current.setAttribute('value', text)
    ref.current.value = text
    const focusEv = new Event('focus')
    const keydownEv = new Event('keydown')
    ref.current.dispatchEvent(focusEv)
    ref.current.dispatchEvent(keydownEv)
    checkDir()
  }

  function checkDir(value) {
    try {
      const dir = getDir(value)
      if (!_.isString(dir))
        return
      setDir(dir)
      ref.current.setAttribute('input-dir', dir)
    } catch (e) {
    }
  }

  function getDir(value) {
    return d ? d : (getDirType(type) || ref.current.value ? !isRTL(value ? value : ref.current.value) ? 'ltr' : 'rtl' : siteDir)
  }


  return (
    <React.Fragment>
      {render(ref, {
        name: name,
        initialize: (ref.current && ref.current.attributes[textFieldInitialize]),
        valid: (!focused || error <= -1),
        value: getSafe(() => ref.current.value, ''),
        errorIndex: (focused) ? error : -1,
        setValue: handleSetValue,
        inputDir: dir,
        props: {
          renderValue: getSafe(() => ref.current.value, ''),
          name: name,
          defaultValue: defaultValue,
          type: type
        },
        inputProps: {}
      })}
    </React.Fragment>
  )
}


TextFieldContainer.defaultProps = {
  type:"text",
  onChangeDelay: 600,
}
TextFieldContainer.propTypes = {
  name: PropTypes.any.isRequired,
  defaultValue: PropTypes.string,
  errorPatterns: PropTypes.array,
  renderGlobalErrorText: PropTypes.func,
  actived: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'number', 'email', 'hidden', 'password', 'search', 'tel', 'url']),
  onChange: PropTypes.func,
  onChangeDelay: PropTypes.number,
  returnValue: PropTypes.func,
  render: PropTypes.func,
  checkInterval: PropTypes.number,
  dir: PropTypes.string
}


export default TextFieldContainer
