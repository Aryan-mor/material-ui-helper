import React from "react";
import {ButtonBase as MaterialButtonBase} from "@material-ui/core";
import PropTypes from 'prop-types'
import Box, { boxPropType } from './Box'
import { UtilsStyle } from './utils/Utils'


function ButtonBase(pr) {
    const {borderRadius = 5, backgroundColor,hoverBackgroundColor, transitionDuration = 200, onClick, buttonProps = {}, ...props} = pr
    return (
        <MaterialButtonBase
            onClick={onClick}
            {...buttonProps}
            style={{
                ...UtilsStyle.borderRadius(borderRadius),
                ...buttonProps.style
            }}>
            <Box
                display={"block"}
                borderRadius={borderRadius}
                {...props}
                hoverStyle={{
                    ...props.hoverStyle,
                    backgroundColor: `${hoverBackgroundColor} !important`,
                    ...UtilsStyle.transition(transitionDuration)
                }}
                style={{
                    backgroundColor:backgroundColor,
                    ...UtilsStyle.transition(transitionDuration),
                    ...UtilsStyle.borderRadius(borderRadius),
                    ...props.style,
                }}>
                {props.children}
            </Box>
        </MaterialButtonBase>
    )
}


ButtonBase.prototype = {
    hoverBackgroundColor: PropTypes.string,
    backgroundColor:PropTypes.string,
    buttonProps: PropTypes.object,
    transitionDuration: PropTypes.number,
    ...boxPropType
}

export default ButtonBase
