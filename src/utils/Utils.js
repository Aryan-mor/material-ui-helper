export const UtilsStyle = {
    transition: (duration = 500) => {
        return {
            'WebkitTransition': 'all ' + duration + 'ms ease',
            'MozTransition': 'all ' + duration + 'ms ease',
            'MsTransition': 'all ' + duration + 'ms ease',
            'OTransition': 'all ' + duration + 'ms ease',
            transition: 'all ' + duration + 'ms ease'
        }
    },
    borderRadius: (radius) => {
        return {
            borderRadius: radius,
            WebkitBorderRadius: radius,
            MozBorderRadius: radius,
        }
    },
    widthFitContent: () => {
        return {
            width: 'max-content',
            whiteSpace: 'nowrap'
        }
    },
    heightFitContent: () => {
        return {
            height: 'max-content',
            whiteSpace: 'nowrap'
        }
    },
    disableTextSelection: () => {
        return {
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'none',
            MsUserSelect: 'none',
            userSelect: 'none'
        }
    }
};
