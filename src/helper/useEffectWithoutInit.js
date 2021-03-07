import React, { useEffect } from 'react'
import { useInit } from '../index'


export default function useEffectWithoutInit(callback, dependencyList) {
  const init = useInit()

  useEffect(() => {
    if (!init())
      return
    callback()
  }, dependencyList)
}
