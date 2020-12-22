import React, { useRef } from 'react'
import {
  Typography,
  gLog,
  SuccessButton,
  FormController,
  createName,
  DefaultTextField,
  Box,
  getSafe,
  tryIt,
  Typography as HelperTypography
} from 'material-ui-helper'
import MaterialTypography from '@material-ui/core/Typography'

export default function Search(params) {

  const ref = useRef(null)

  return (
    <Box>
      <Box alignItems={"stretch"}>
        <Typography variant={'h2'}>
          salam
        </Typography>
        <Typography variant={'h6'}>
          salam
        </Typography>
      </Box>
      {/*<SuccessButton mx={2}*/}
      {/*               onClick={() => {*/}
      {/*                 tryIt(() => {*/}
      {/*                   gLog('saflasklfklaskflkas', ref.current.serialize())*/}
      {/*                 })*/}
      {/*               }}*/}
      {/*               typography={{*/}
      {/*                 variant: 'h1'*/}
      {/*               }}>*/}
      {/*  default button*/}
      {/*</SuccessButton>*/}
      {/*<FormController innerRef={ref} name={'form22'} my={2}>*/}
      {/*  <DefaultTextField name={createName({ group: 'gp', name: 'input' })}/>*/}
      {/*</FormController>*/}
      {/*<Box width={'1/3'} column={true}*/}
      {/*     textSelectable={false} pt={5}>*/}
      {/*  {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((variant) =>*/}
      {/*    <MaterialTypography key={variant} variant={variant}>*/}
      {/*      {variant} - متن تستی*/}
      {/*    </MaterialTypography>)}*/}
      {/*</Box>*/}
      {/*<Box width={'1/3'} column={true} pt={5}>*/}
      {/*  {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((variant) =>*/}
      {/*    <HelperTypography key={variant} variant={variant}>*/}
      {/*      {variant} - متن تستی*/}
      {/*    </HelperTypography>)}*/}
      {/*</Box>*/}
    </Box>
  )
}



