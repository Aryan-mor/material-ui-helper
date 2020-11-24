import React from "react";
import MaterialTooltip from "@material-ui/core/Tooltip";
import PropTypes from 'prop-types'

export default function Tooltip({title, disable, ...props}) {
    return (
        (!disable && title) ?
            <MaterialTooltip title={title}>
                {props.children}
            </MaterialTooltip> :
            <React.Fragment>
                {props.children}
            </React.Fragment>
    )
}

export const tooltipPrototype = {
  title: PropTypes.string,
  disable: PropTypes.bool,
}

Tooltip.prototype =tooltipPrototype
