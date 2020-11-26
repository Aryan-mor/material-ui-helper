import React from 'react'
import MaterialBox from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Skeleton from '@material-ui/lab/Skeleton'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { gLog, UtilsStyle } from '..'

function Box(pr) {

  //region props
  const {
    hoverStyle,
    display = 'flex',
    alignItems,
    justifyContent,
    alignCenter = false,
    justifyCenter = false,
    center = false,
    flexDirection,
    column = false,
    borderRadius,
    skeleton,
    loading,
    loadingWidth = '25%',
    onClick,
    ...props
  } = pr
  //endregion props
  return (
    <HoverStyle hoverStyle={hoverStyle} {...props}>
      <LoadingContainer skeleton={skeleton} loading={loading}>
        <MaterialBox
          overflow={'hidden'}
          display={display}
          alignItems={alignItems || (alignCenter || center) ? 'center' : undefined}
          justifyContent={justifyContent || (justifyCenter || center) ? 'center' : undefined}
          flexDirection={flexDirection || (column) ? 'column' : undefined}
          onClick={onClick}
          {...props}
          style={{
            ...UtilsStyle.borderRadius(borderRadius),
            ...props.style
          }}>
          {props.children}
          <Loading loading={loading} skeleton={skeleton} loadingWidth={loadingWidth}/>
        </MaterialBox>
      </LoadingContainer>
    </HoverStyle>
  )
}

//region propTypes
export const boxPropType = {
  width:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  display: PropTypes.oneOf(['block', 'flex', 'none', 'inline', 'inline-block', 'grid']),
  alignItems: PropTypes.oneOf(['unset', 'flex-start', 'flex-end', 'center', 'stretch', 'initial', 'inherit']),
  alignContent: PropTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'initial', 'inherit']),
  alignSelf: PropTypes.oneOf(['auto', 'stretch', 'center', 'flex-start', 'flex-end', 'baseline', 'initial', 'inherit']),
  justifyCenter: PropTypes.bool,
  alignCenter: PropTypes.bool,
  center: PropTypes.bool,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse', 'initial', 'inherit']),
  column: PropTypes.bool,
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hoverStyle: PropTypes.object,
  skeleton: PropTypes.bool,
  loading: PropTypes.bool,
  loadingWidth: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func
}

Box.propTypes = boxPropType

export default Box
//endregion propTypes

//region HoverStyle
const useBoxHoverStyles = makeStyles({
  hoverStyleGenerator: props => ({
    '&:hover': {
      ...props.hoverStyle
    }
  })
})

function HoverStyle({ hoverStyle, children, ...props }) {
  const classes = hoverStyle ? useBoxHoverStyles({ hoverStyle }) : undefined
  return (
    classes ?
      React.cloneElement(children, { ...props, className: clsx(classes.hoverStyleGenerator, props.className) }) :
      React.cloneElement(children, props)
  )
}

//endregion HoverStyle

function LoadingContainer({ children, loading, skeleton, ...props }) {

  return (
    React.cloneElement(children, { ...props, position: (loading || skeleton) ? 'relative' : undefined })
  )
}

function Loading({ children, loading, loadingWidth, skeleton, ...props }) {

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
