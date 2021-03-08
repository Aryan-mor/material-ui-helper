import React, { useCallback, useState as useSt } from 'react'
import _ from 'lodash'

export default function useState(initialState) {

  const [val, setVal] = useSt(initialState)

  const handleChange = useCallback((value) => {
    try {
      if (_.isEqual(value, val))
        return
    } catch (e) {
    }
    setVal(value)
  }, [val, setVal])

  return [val, handleChange]
}
