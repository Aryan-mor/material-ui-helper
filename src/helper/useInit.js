import React, { useEffect, useRef } from 'react'
import { getSafe } from '..'


export default function() {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true
  }, []);

  return () => getSafe(() => ref.current, false)
}
