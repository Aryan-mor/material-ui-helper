import React from "react";
import {Box, getSafe, tryIt, Typography as HelperTypography} from "material-ui-helper";
import MaterialTypography from "@material-ui/core/Typography";
export default function Search(params) {

  return (
    <Box>
      <Box width={"1/3"} column={true} pt={5}>
        {["h1","h2","h3","h4","h5","h6"].map((variant)=>
          <MaterialTypography key={variant} variant={variant}>
            {variant} - متن تستی
          </MaterialTypography>)}
      </Box>
      <Box width={"1/3"} column={true} pt={5}>
        {["h1","h2","h3","h4","h5","h6"].map((variant)=>
          <HelperTypography key={variant} variant={variant}>
            {variant} - متن تستی
          </HelperTypography>)}
      </Box>
    </Box>
  )
}



