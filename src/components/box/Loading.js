import React from 'react'
import MaterialBox from '@material-ui/core/Box'
import Skeleton from '@material-ui/lab/Skeleton'
import CircularProgress from '@material-ui/core/CircularProgress'
import { gLog } from '../../utils/Helper'

export function LoadingContainer({ children, loading, skeleton, ...props }) {
  return (
    React.cloneElement(children, { ...props, position: (loading || skeleton) ? 'relative' : undefined })
  )
}

export default function Loading({ children, loading, loadingWidth, skeleton }) {

  return (
    <React.Fragment>
      {
        (skeleton || loading) &&
        <MaterialBox
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          width={1} height={1}
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}>
          {
            (skeleton) &&
            <Skeleton
              variant="rect"
              style={{
                width: '100%',
                height: '100%'
              }}/>
          }
          {
            loading &&
            <MaterialBox
              display={'flex'}
              width={1} height={1}
              alignItems={'center'}
              justifyContent={'center'}>
              <CircularProgress
                style={{
                  width: loadingWidth,
                  height: loadingWidth
                }}/>
            </MaterialBox>
          }
        </MaterialBox>
      }
    </React.Fragment>
  )
}
