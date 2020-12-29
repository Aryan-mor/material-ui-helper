import React, { useEffect, useLayoutEffect } from 'react'
import { TextField as MaterialTextField, useTheme } from '@material-ui/core'
import _ from 'lodash'
import Typography from '../Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { getSafe, gLog, tryIt } from '../..'

function TextField(pr) {
  const {
    inputRef,
    helperText,
    helperTextIcon,
    defaultValue,
    startAction,
    startAdornment,
    endAction,
    endAdornment,
    containerProps,
    autoFocus,
    onFocusIn,
    onFocusOut,
    ...props
  } = pr

  const theme = useTheme()

  const onFocusDebounce = _.debounce(e => {

    onFocusIn(e, getSafe(() => {
      return e.target.value
    }, ''))
  }, 300)

  const onBlurDebounce = _.debounce(e => {
    onFocusOut(e, getSafe(() => {
      return e.target.value
    }, ''))
  }, 300)


  useEffect(() => {
    try {
      inputRef.current.value = defaultValue
      inputRef.current.setValue(_.trim(defaultValue))
    } catch (e) {
    }
  }, [defaultValue])


  return (
    <Box display={'flex'} width={props.fullWidth ? 1 : null} alignItems="flex-end" {...containerProps}>
      <Box flex={props.fullWidth ? 1 : null}>
        <MaterialTextField
          inputRef={inputRef}
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          onFocus={onFocusIn ? onFocusDebounce : undefined}
          onBlur={onFocusOut ? onBlurDebounce : undefined}
          {...props}
          helperText={(
            helperText &&
            <Typography component={'span'} variant={'caption'}
                        color={props.error ? theme.palette.error.main : null}
                        display={'flex'} alignItems={'center'}>
              {
                helperTextIcon && helperTextIcon}
              {helperText}
            </Typography>
          )}
          InputProps={{
            ...props.InputProps,
            startAdornment: startAdornment && (
              <InputAdornment position="start">
                {startAdornment}
              </InputAdornment>
            ),
            endAdornment: endAdornment && (
              <InputAdornment position="end">
                {endAdornment}
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Box>

  )

}

TextField.propTypes = {
  inputRef: PropTypes.any,
  helperText: PropTypes.string,
  helperTextIcon: PropTypes.any,
  defaultValue: PropTypes.string,
  startAction: PropTypes.any,
  startAdornment: PropTypes.any,
  endAction: PropTypes.any,
  endAdornment: PropTypes.any,
  containerProps: PropTypes.object,
  autoFocus: PropTypes.bool,
  onFocusIn: PropTypes.func,
  onFocusOut: PropTypes.func
}

export default TextField


export const createName = ({ group, array, name }) => {
  if (group) {
    return `${group}~~~${createName({ array: array, name: name })}~~~`
  }
  let n = array ? `${array}___${name}` : name
  return n + (array ? '___' : '')
}
