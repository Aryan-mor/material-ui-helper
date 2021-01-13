import React, { useEffect, useLayoutEffect } from 'react'
import _ from 'lodash'
import {
  notValidTextField,
  textFieldActived,
  textFieldNewValue,
  textFieldRenderValue
} from './textField/TextFieldContainer'
import PropTypes from 'prop-types'
import Box from './box/Box'
import { getSafe } from '..'


function getGroup(text) {
  try {
    const ch = text.match('(.+)~~~(.+)~~~')
    if (ch)
      return ch
  } catch (e) {
  }
  return []
}

function getArray(text) {
  try {
    const ch = text.match('(.+)___(.+)___')
    if (ch)
      return ch
  } catch (e) {
  }
  return []
}

function serialize(ref) {
  let data = {}
  const form = ref.current
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i]

    if (element.disabled && element.getAttribute(textFieldActived) !== 'true')
      continue
    const type = element.type
    let name = element.name.trim()

    if (name === '')
      continue

    const nodeName = element.nodeName.toLowerCase()
    let newData = {}
    //region CheckGroup
    const gp = getGroup(name)
    let group = gp[1]
    name = gp[2] ? gp[2] : name
    const ar = getArray(name)
    const array = ar[1]
    name = ar[2] ? ar[2] : name

    try {
      newData = group ? data[group][name] : data[name]
    } catch (e) {
    }
    //endregion CheckGroup
    if (nodeName === 'input' || nodeName === 'textarea') {
      switch (type) {
        case 'radio':
        case 'checkbox':
          if (element.checked) {
            newData = element.value
          }
          break
        default:
          newData = element.getAttribute(textFieldRenderValue) || element.value
      }
    } else if (nodeName === 'select') {
      switch (type) {
        case 'select-one':
          newData = element.value
          break
        case 'select-multiple':
          for (let j = 0; j < element.options.length; j++) {
            if (element.options[j].selected) {
              newData = element.value
            }
          }
          break
      }
    } else if (nodeName === 'button') {
      switch (type) {
        case 'reset':
        case 'submit':
        case 'button':
          newData = element.value
          break
      }
    }

    if (newData === undefined)
      continue

    if (group) {
      if (!data[group])
        data[group] = {}
      if (array) {
        if (!_.isArray(data[group][array]))
          data[group][array] = []
        const val = {}
        val[name] = newData
        data[group][array].push(val)
        continue
      }
      data[group][name] = newData
      continue
    }

    if (array) {
      if (!_.isArray(data[array]))
        data[array] = []
      const val = {}
      val[name] = newData
      data[array].push(val)
      continue
    }
    data[name] = newData
  }
  return data
}

let timer = {}
let onChangeTimer = {}
export const notValidFormController = 'form-not-valid'

function FormController(pr) {
  const {
    name = 'form',
    innerRef,
    checkInterval = 1000,
    onChange,
    onChangeInterval = 4000,
    onSubmit,
    ...props
  } = pr

  useEffect(() => {
    return () => {
      clearTimeout(timer[name])
      _.remove(timer, (v, k) => k === name)
      clearTimeout(timer[onChangeTimer])
      _.remove(onChangeTimer, (v, k) => k === name)
    }
  }, [])

  useLayoutEffect(() => {
    try {
      if (innerRef.current && innerRef.current.serialize) {
        return
      }
      innerRef.current.serialize = () => {
        return serialize(innerRef)
      }
      innerRef.current.hasError = () => {
        const err = checkError()
        setAttr(err)
        return err
      }
      innerRef.current.getErrorElement = () => {
        try {
          const elName = innerRef.current.getAttribute(notValidFormController)
          return innerRef.current.querySelector(`input[name*=${elName}]`)
        } catch (e) {
          return null
        }
      }

      setAttr(checkError())
      const config = { attributes: true, childList: true, subtree: true }
      const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
          try {
            if (getSafe(()=>mutation.target.attributes.type.name !== "attributes",false)|| mutation.attributeName === textFieldNewValue) {
              if (mutation.attributeName === notValidTextField) {
                clearTimeout(timer[name])
                timer[name] = setTimeout(() => {
                }, checkInterval)
              }
              clearTimeout(onChangeTimer[name])
              setAttr(checkError())
              if (onChange) {
                onChangeTimer[name] = setTimeout(() => {
                  onChange()
                }, onChangeInterval)
              }
            }
          } catch (e) {
          }
        }
      }

      const observer = new MutationObserver(callback)
      observer.observe(innerRef.current, config)
      return () => {
        observer.disconnect()
      }
    } catch (e) {
    }
  }, [innerRef])

  function setAttr(error) {
    try {
      if (!error) {
        innerRef.current.removeAttribute(notValidFormController)
        return
      }
      innerRef.current.setAttribute(notValidFormController, error)
    } catch (e) {
      console.error('FormController::setAttr', e)
    }
  }

  //region Functions
  function checkError() {
    let hasError = false
    try {
      let nodes = innerRef.current.getElementsByTagName('input')
      _.forEach(nodes, function(value) {
        try {
          if (value.hasError()) {
            hasError = value.name
            return false
          }
        } catch (e) {
        }
      })
    } catch (e) {
    }
    // if (hasError)
    //     console.log("element has error -> " + hasError, elements)
    return hasError
  }

  //endregion Functions


  return (
    <Box ref={innerRef}
         id={name}
         name={name}
         component="form"
         {...props}
         formcontrol="true"
         onSubmit={(e) => {
           e.preventDefault()
           if (onSubmit)
             onSubmit()
         }}>
      {props.children}

      {
        onSubmit &&
        <input
          type={'submit'}
          onClick={() => {
            //required Error: Dont delete this function
          }}
          style={{
            display: 'none'
          }}/>
      }
    </Box>
  )
}

FormController.propTypes = {
  name: PropTypes.string,
  innerRef: PropTypes.any.isRequired,
  checkInterval: PropTypes.number,
  onChange: PropTypes.func,
  onChangeInterval: PropTypes.number,
  onSubmit: PropTypes.func
}

export default FormController
