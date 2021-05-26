 import React, { useEffect, useRef } from 'react'
import { getSafe } from '..'
import _ from 'lodash'

export default function() {
  const ref = useRef(false)

  useEffect(() => {
    setTimeout(() => {
      ref.current = true
    }, 100)
  }, [])

  return () => getSafe(() => _.cloneDeep(ref.current), false)
}
