import React, { useCallback, useEffect, useRef } from 'react'
import { gError, getSafe, gLog, tryIt, useWindowSize } from '../../utils/Helper'
import useState from '../useState'
import useLimit from './useLimit'


export default function useLimitHeight(acceptableHeight, { defaultShow,watcher=[],...props} = {}) {
  return useLimit(acceptableHeight,{defaultShow,isTextLine:false,watcher,...props})
}


