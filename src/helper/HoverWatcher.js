import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { gLog } from '../utils/Helper'
import { Box } from '@material-ui/core'


export default function HoverWatcher({component:cm, enterSkip, leaveSkip, enterTimeout, leaveTimeout, timeout = 600, onHover, ...props}) {

    const [timer, setTimer] = useState();

    function onHoverChange(hover,e) {
        clearTimeout(timer)
        if (enterSkip && hover) {
            onHover(hover,e)
            return
        }
        if (leaveSkip && !hover) {
            onHover(hover,e)
            return;
        }
        setTimer(setTimeout(() => {
            onHover(hover,e)
        }, (hover && enterTimeout) ? enterTimeout : (!hover && leaveTimeout) ? leaveTimeout : timeout))
    }


    return (
        <Box
            component={cm}
            onMouseEnter={(e) => {
                onHoverChange(true,e)
            }}
            onMouseLeave={(e) => {
                onHoverChange(false,e)
            }}
            {...props}>
            {props.children}
        </Box>
    )
}

HoverWatcher.propTypes = {
    component:PropTypes.any,
    enterSkip: PropTypes.bool,
    leaveSkip: PropTypes.bool,
    enterTimeout: PropTypes.number,
    leaveTimeout: PropTypes.number,
    timeout: PropTypes.number,
    onHover: PropTypes.func,
};


