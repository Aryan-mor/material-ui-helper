import React, { useEffect, useMemo } from 'react'
import MaterialBox from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Skeleton from '@material-ui/lab/Skeleton'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { getSafe, UtilsStyle } from '../../index'
import styles from '../../styles.module.css'
import ResponsivePropsPush from './ResponsivePropsPush'
import HoverStyle from './HoverProps'
import Loading, { LoadingContainer } from './Loading'


const Box = React.forwardRef((pr, ref) => {
  //region props
  const {
    component,
    className,
    hoverProps,
    display,
    overflow,
    width: wi,
    baseWidth,
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
  }, [animationHoverIterationCount,hoverProps])
  const alignItemsMemo = useMemo(() => alignItems || ((alignCenter || center) ? 'center' : undefined), [alignItems, alignCenter, center])
  const justifyContentMemo = useMemo(() => justifyContent || ((justifyCenter || center) ? 'center' : undefined), [justifyContent, justifyCenter, center])
  const flexDirectionMemo = useMemo(() => flexDirection || ((flexDirectionColumn) ? 'column' : undefined), [flexDirection, flexDirectionColumn])
  //endregion Memos


  return (
    <ResponsivePropsPush
      responsiveProps={responsiveProps}
      hoverProps={hoverPropsMemo}
      className={clsx([animClass, animHoverClass, className])}
      component={component}
      overflow={overflow}
      baseWidth={wi || baseWidth}
      display={display}
      alignItems={alignItemsMemo}
      justifyContent={justifyContentMemo}
      flexDirection={flexDirectionMemo}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
      style={style}>
      <HoverStyle>
        <LoadingContainer skeleton={skeleton} loading={loading}>
          <MaterialBox ref={ref}>
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


