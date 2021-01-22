import React, { useMemo } from 'react'
import MaterialBox from '@material-ui/core/Box'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { getSafe, gLog, UtilsStyle } from '../../index'
import styles from '../../styles.module.css'
import ResponsivePropsPush from './ResponsivePropsPush'
import HoverStyle from './HoverProps'
import Loading, { LoadingContainer } from './Loading'
import _ from 'lodash'
import { useTheme } from '@material-ui/core'

const Box = React.forwardRef((pr, ref) => {
  //region props
  const theme = useTheme()
  const {
    component,
    className,
    hoverProps,
    display,
    overflow,
    width,
    margin: marginProp = {},
    alignItems,
    justifyContent,
    alignCenter,
    justifyCenter,
    center,
    flexDirection,
    flexDirectionColumn,
    borderRadius,
    transform,
    hoverTransform,
    transformCount,
    hoverTransformCount,
    skeleton,
    loading,
    loadingWidth,
    textSelectable,
    responsiveProps,
    onClick,
    onMouseEnter,
    onMouseLeave,
    mt, ml, mb, mr, mx, my, m,
    ...props
  } = pr
  //endregion props
  const getTransformStyle = (forHover = false) => {
    const tr = forHover ? hoverTransform : transform
    if (!tr) {
      return {}
    }
    const trCount = forHover ? hoverTransformCount : transformCount
    return {
      animClass: tr === 'shake' ? styles.shakeAnimationMaterialHelper : tr === 'shake2' ? styles.shake2AnimationMaterialHelper : undefined,
      animationIterationCount: trCount
    }
  }

  //region Memos
  const { animClass, animationIterationCount } = useMemo(() => {
    return getTransformStyle(false)
  }, [transform, transformCount])
  const { animHoverClass, animationHoverIterationCount } = useMemo(() => {
    return getTransformStyle(true)
  }, [hoverTransform, hoverTransformCount])
  const style = useMemo(() => {
    return {
      animationIterationCount: animationIterationCount,
      ...(!textSelectable ? {
        WebkitTouchCallout: 'none', /* iOS Safari */
        WebkitUserSelect: 'none', /* Safari */
        MozUserSelect: 'none', /* Old versions of Firefox */
        MsUserSelect: 'none', /* Internet Explorer/Edge */
        userSelect: 'none'
      } : {}),
      ...UtilsStyle.borderRadius(borderRadius),
      ...props.style
    }
  }, [animationIterationCount, textSelectable, borderRadius, props.style])
  const hoverPropsMemo = useMemo(() => {
    return {
      ...hoverProps,
      style: {
        ...getSafe(() => hoverProps.style, {}),
        animationIterationCount: animationHoverIterationCount
      }
    }
  }, [animationHoverIterationCount, hoverProps])
  const alignItemsMemo = useMemo(() => alignItems || ((alignCenter || center) ? 'center' : undefined), [alignItems, alignCenter, center])
  const justifyContentMemo = useMemo(() => justifyContent || ((justifyCenter || center) ? 'center' : undefined), [justifyContent, justifyCenter, center])
  const flexDirectionMemo = useMemo(() => flexDirection || ((flexDirectionColumn) ? 'column' : undefined), [flexDirection, flexDirectionColumn])
  //endregion Memos

  const margin = useMemo(() => {
    let marg = _.cloneDeep(marginProp)

    if ( _.isEmpty(marg)) {
      return { mt, ml, mb, mr, mx, my, m, style: {} }
    }
    if (!_.isObject(marg)) {
      marg = {}
    }
    const mar = {
      mt: (mt || marg.mt || my || marg.my || m || 0),
      ml: (ml || marg.ml || mx || marg.mx || m || 0),
      mb: (mb || marg.mb || my || marg.my || m || 0),
      mr: (mr || marg.mr || mx || marg.mx || m || 0)
    }

    const mtV = _.isNumber(mar.mt) ? theme.spacing(mar.mt) : mar.mt
    const mrV = _.isNumber(mar.mr) ? theme.spacing(mar.mr) : mar.mr
    const mbV = _.isNumber(mar.mb) ? theme.spacing(mar.mb) : mar.mb
    const mlV = _.isNumber(mar.ml) ? theme.spacing(mar.ml) : mar.ml

    return {

      style: {
        margin: `${mtV}px ${mrV}px ${mbV}px ${mlV}px`
      }
    }
  }, [mt, ml, mb, mr, mx, my, m, marginProp])



  return (
    <ResponsivePropsPush
      responsiveProps={responsiveProps}
      hoverProps={hoverPropsMemo}
      className={clsx([animClass, animHoverClass, className])}
      component={component}
      overflow={overflow}
      width={width}
      display={display}
      alignItems={alignItemsMemo}
      justifyContent={justifyContentMemo}
      flexDirection={flexDirectionMemo}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      m={margin.m}
      my={margin.my}
      mx={margin.mx}
      mt={margin.mt}
      mb={margin.mb}
      mr={margin.mr}
      ml={margin.ml}
      {...props}
      style={{
        ...style,
        ...margin.style
      }}>
      <HoverStyle>
        <LoadingContainer skeleton={skeleton} loading={loading}>
          <MaterialBox
            ref={ref}>
            {props.children}
            <Loading loading={loading} skeleton={skeleton} loadingWidth={loadingWidth}/>
          </MaterialBox>
        </LoadingContainer>
      </HoverStyle>
    </ResponsivePropsPush>
  )
})

//region propTypes
export const boxPropType = {
  component: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  display: PropTypes.oneOf(['block', 'flex', 'none', 'inline', 'inline-block', 'grid']),
  overflow: PropTypes.oneOf(['visible', 'hidden', 'scroll', 'auto']),
  itemscope: PropTypes.oneOf(['visible', 'hidden', 'scroll', 'auto']),
  alignItems: PropTypes.oneOf(['unset', 'flex-start', 'flex-end', 'center', 'stretch', 'initial', 'inherit']),
  alignContent: PropTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'initial', 'inherit']),
  alignSelf: PropTypes.oneOf(['auto', 'stretch', 'center', 'flex-start', 'flex-end', 'baseline', 'initial', 'inherit']),
  justifyCenter: PropTypes.bool,
  alignCenter: PropTypes.bool,
  center: PropTypes.bool,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse', 'initial', 'inherit']),
  flexDirectionColumn: PropTypes.bool,
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transform: PropTypes.oneOf(['shake']),
  hoverTransform: PropTypes.oneOf(['shake']),
  transformCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hoverTransformCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hoverProps: PropTypes.object,
  skeleton: PropTypes.bool,
  loading: PropTypes.bool,
  textSelectable: PropTypes.bool,
  loadingWidth: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  responsiveProps: PropTypes.shape({
    xs: PropTypes.object,
    sm: PropTypes.object,
    md: PropTypes.object,
    lg: PropTypes.object,
    xl: PropTypes.object
  }),
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}

Box.defaultProps = {
  display: 'flex',
  alignCenter: false,
  justifyCenter: false,
  center: false,
  flexDirectionColumn: false,
  loadingWidth: '25%',
  textSelectable: true,
  hoverProps: {},
  responsiveProps: {}
}

Box.propTypes = {
  component: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  display: PropTypes.oneOf(['block', 'flex', 'none', 'inline', 'inline-block', 'grid']),
  overflow: PropTypes.oneOf(['visible', 'hidden', 'scroll', 'auto']),
  alignItems: PropTypes.oneOf(['unset', 'flex-start', 'flex-end', 'center', 'stretch', 'initial', 'inherit']),
  alignContent: PropTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'initial', 'inherit']),
  alignSelf: PropTypes.oneOf(['auto', 'stretch', 'center', 'flex-start', 'flex-end', 'baseline', 'initial', 'inherit']),
  justifyCenter: PropTypes.bool,
  alignCenter: PropTypes.bool,
  center: PropTypes.bool,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse', 'initial', 'inherit']),
  flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse', 'initial', 'inherit']),
  flexDirectionColumn: PropTypes.bool,
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transform: PropTypes.oneOf(['shake', 'shake2']),
  hoverTransform: PropTypes.oneOf(['shake', 'shake2']),
  transformCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hoverTransformCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hoverProps: PropTypes.object,
  skeleton: PropTypes.bool,
  loading: PropTypes.bool,
  textSelectable: PropTypes.bool,
  loadingWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  responsiveProps: PropTypes.shape({
    xs: PropTypes.object,
    sm: PropTypes.object,
    md: PropTypes.object,
    lg: PropTypes.object,
    xl: PropTypes.object
  }),
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}

export default Box
//endregion propTypes


