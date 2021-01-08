import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Box from '../components/Box'


export default function HoverWatcher({component:cm, enterSkip, leaveSkip, enterTimeout, leaveTimeout, timeout = 600, onHover, ...props}) {

    const [timer, setTimer] = useState();

    function onHoverChange(hover) {
        clearTimeout(timer)
        if (enterSkip && hover) {
            onHover(hover)
            return
        }
        if (leaveSkip && !hover) {
            onHover(hover)
            return;
        }
        setTimer(setTimeout(() => {
            onHover(hover)
        }, (hover && enterTimeout) ? enterTimeout : (!hover && leaveTimeout) ? leaveTimeout : timeout))
    }


    return (
        <Box
            component={cm}
            onMouseEnter={() => {
                onHoverChange(true)
            }}
            onMouseLeave={() => {
                onHoverChange(false)
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


