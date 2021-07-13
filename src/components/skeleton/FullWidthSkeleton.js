import React from 'react'
import MaterialSkeleton from '@material-ui/lab/Skeleton'


export default function FullWidthSkeleton({...props}) {



  return (
    <MaterialSkeleton
      {...props}
      style={{
        ...props.style,
        position: 'relative',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      }}/>
  )
}