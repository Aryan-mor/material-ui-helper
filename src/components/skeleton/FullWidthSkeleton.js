import React from 'react'
import MaterialSkeleton from '@material-ui/lab/Skeleton'
import { UtilsStyle } from '../../utils/Utils'


export default function FullWidthSkeleton({borderRadius=5,...props}) {

  return (
    <MaterialSkeleton
      variant={"rect"}
      {...props}
      style={{
        ...props?.style,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        height:'100%',
        width:'100%',
        ...UtilsStyle.borderRadius(borderRadius)
      }}/>
  )
}