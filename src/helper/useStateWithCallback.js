import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { getSafe, tryIt, useEffectWithoutInit } from '..'
import _ from 'lodash'
import useState from './useState'
import useInit from './useInit'

const useStateWithCallback = (initialState, callback, initCall = true) => {
  const [state, setState] = useState(initialState)
  const lastValue = useRef(null)
  const init = useInit()


  useEffect(() => {
    if (!initCall && !init()) {
      return
    }
    callback(state, getSafe(() => _.cloneDeep(lastValue.current)))
    lastValue.current = state
  }, [state, callback])

  return [state, setState]
}

export default useStateWithCallback

export const useStateWithCallbackInstant = (initialState, callback) => {
  const lastValue = useRef(null)
  const [state, setState] = useState(initialState)

  useLayoutEffect(() => {
    callback(state, getSafe(() => _.cloneDeep(lastValue.current)))
    lastValue.current = state
  }, [state, callback])

  return [state, setState]
}

export const useStateWithCallbackLazy = initialValue => {
  const callbackRef = useRef(null)
  const lastValue = useRef(null)
  const [state, setState] = useState(initialValue)

  useEffect(() => {
    tryIt(() => lastValue.current = state)
  }, [])

  useEffect(() => {
    tryIt(() => {
      callbackRef.current(state, getSafe(() => _.cloneDeep(lastValue.current)))
      callbackRef.current = null
      lastValue.current = state
    })
  }, [state])

  const setValueWithCallback = (newValue, callback) => {
    callbackRef.current = callback

    return setState(newValue)
  }

  return [state, setValueWithCallback]
}
