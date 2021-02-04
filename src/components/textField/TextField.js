import React, { useEffect } from 'react'
import { TextField as MaterialTextField, useTheme } from '@material-ui/core'
import _ from 'lodash'
import Typography from '../typography/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import PropTypes from 'prop-types'
import { getSafe, tryIt } from '../..'
import Box from '../box/Box'
import { makeStyles } from '@material-ui/styles'


const useStylesTextField = makeStyles((theme) => ({
  textFieldToot: (({ color, value, error }) => {
    if (!_.isObject(color))
      return
    const getInnerColor = (co = {}, baseColor = color) => {
      const main = getSafe(() => co.main || baseColor.main, baseColor.main)
      const success = getSafe(() => co.success || baseColor.success || main, main)
      const error = getSafe(() => co.error || baseColor.error || main, main)
      return { main, success, error }
    }

    const getBaseColor = (co = {}, baseColor = color) => {
      const main = getSafe(() => {
        return co.main || baseColor.main
      }, baseColor.main)
      const error = getSafe(() => {
        return co.error || baseColor.error || main
      }, main)
      const success = getSafe(() => {
        return co.success || baseColor.success || main
      }, main)


      const baseProps = { main, error, success }
      const props = _.cloneDeep(baseProps)
      props.hover = getInnerColor(co.hover, baseColor.hover)
      props.focus = getInnerColor(co.focus, baseProps)
      return props
    }

    const mainBaseColor = getBaseColor(color)
    const labelBaseColor = getBaseColor(color.label, mainBaseColor)
    const borderBaseColor = getBaseColor(color.border, mainBaseColor)

    const getColor = (co = mainBaseColor) => {
      return getSafe(() => {
        if (error) {
          return {
            mainColor: co.error,
            hoverColor: co.hover.error,
            focusColor: co.focus.error
          }
        }
        if (!_.isEmpty(value)) {
          return {
            mainColor: co.success,
            hoverColor: co.hover.success,
            focusColor: co.focus.success
          }
        }
        throw ''
      }, {
        mainColor: co.main,
        hoverColor: co.hover.main,
        focusColor: co.focus.main
      })
    }


    const { mainColor, hoverColor, focusColor } = getColor(mainBaseColor)

    const { mainColor: labelMainColor, hoverColor: labelHoverColor, focusColor: labelFocusColor } = getColor(labelBaseColor)
    const { mainColor: borderMainColor, hoverColor: borderHoverColor, focusColor: borderFocusColor } = getColor(borderBaseColor)


    return ({
      '&:hover': {
        '& label:not(.Mui-disabled)': {
          color: labelHoverColor
        }
      },
      '& label': {
        color: labelMainColor,
        '&.Mui-focused': {
          color: labelFocusColor
        }
      },
      '& label+div:before': {
        borderColor: borderMainColor
      },
      '& label+div:hover:not(.Mui-disabled):before': {
        borderColor: borderHoverColor
      },
      '& label.Mui-focused+div:not(.Mui-disabled):after': {
        borderColor: borderFocusColor
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: borderFocusColor,
        '&:hover': {
          color: borderHoverColor
        }
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: borderMainColor
        },
        '&:hover fieldset': {
          borderColor: borderHoverColor
        },
        '&.Mui-focused fieldset': {
          borderColor: borderFocusColor
        }
      }
    })
  }),
  focused: {}
}))

function TextField(pr) {
  const {
    inputRef,
    helperText,
    helperTextIcon,
    value,
    defaultValue,
    color,
    error,
    placeholder,
    inputStyle,
    inputProps,
    InputProps,
    autoComplete,
    disabled,
    type,
    startAction,
    startAdornment,
    endAction,
    endAdornment,
    containerProps,
    autoFocus,
    renderValue,
    onChange,
    onChangeDelay,
    onFocusIn,
    onFocusInDelay,
    onFocusOut,
    onFocusOutDelay,
    ...props
  } = pr

  const classes = color ? useStylesTextField({ color, value: renderValue, error }) : {}
  const theme = useTheme()

  const onFocusDebounce = _.debounce(e => {
    tryIt(() => {
      onFocusIn()
    })
  }, onFocusInDelay)

  const onBlurDebounce = _.debounce(e => {
    tryIt(() => {
      onFocusOut()
    })
  }, onFocusOutDelay)

  const onChangeDebounce = _.debounce(e => {
    onChange(e,
      getSafe(() => {
        return e.target.value
      }, ''),
      { error })
  }, onChangeDelay)

  const onChangeNoDebounce = (e) => {
    onChange(e,
      getSafe(() => {
        return e.target.value
      }, ''),
      { error })
  }


  useEffect(() => {
    try {
      inputRef.current.value = defaultValue
      inputRef.current.setValue(_.trim(defaultValue))
    } catch (e) {
    }
  }, [defaultValue])


  return (
    <Box className={classes.textFieldToot} display={'flex'} width={props.fullWidth ? 1 : null}
         alignItems="flex-end" {...containerProps}>
      <Box flex={props.fullWidth ? 1 : null}>
        <MaterialTextField
          inputRef={inputRef}
          value={value}
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          disabled={Boolean(disabled)}
          placeholder={placeholder}
          input-type={type}
          type={type}
          onFocus={onFocusIn ? onFocusDebounce : undefined}
          onBlur={onFocusOut ? onBlurDebounce : undefined}
          onChange={onChange ? (_.isString(value) ? onChangeNoDebounce : onChangeDebounce) : undefined}
          error={error}
          {...props}
          helperText={(
            helperText &&
            <Typography component={'span'} variant={'caption'}
                        color={error ? theme.palette.error.main : null}
                        display={'flex'} alignItems={'center'}>
              {helperTextIcon && helperTextIcon}
              {helperText}
            </Typography>
          )}
          inputProps={{
            ...inputProps,
            ...(autoComplete ? {
              autoComplete: autoComplete
            } : {}),
            style: {
              ...getSafe(() => inputProps.style, {}),
              ...getSafe(() => InputProps.style, {}),
              ...inputStyle
            }
          }}
          InputProps={{
            ...InputProps,
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


TextField.defaultProps = {
  inputStyle: {},
  inputProps: {},
  autoComplete: 'on',
  onChangeDelay: 300,
  onFocusInDelay: 300,
  onFocusOutDelay: 300
}


TextField.propTypes = {
  inputRef: PropTypes.any,
  helperText: PropTypes.string,
  helperTextIcon: PropTypes.any,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  inputStyle: PropTypes.object,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.oneOf([
    'on',
    'off',
    'name',
    'email',
    'username',
    'honorific-prefix',
    'language',
    'impp',
    'url',
    'photo',

    'organization-title',
    'organization',

    'new-password',
    'current-password',
    'one-time-code',

    'given-name',
    'additional-name',
    'family-name',
    'honorific-suffix',
    'nickname',
    'bday',
    'bday-day',
    'bday-month',
    'bday-year',
    'sex',

    'tel',
    'tel-country-code',
    'tel-national',
    'tel-area-code',
    'tel-local',
    'tel-extension',


    'street-address',
    'address-line1',
    'address-line2',
    'address-line3',
    'address-level4',
    'address-level3',
    'address-level2',
    'address-level1',
    'country',
    'country-name',
    'postal-code',

    'shipping street-address',
    'shipping locality',
    'shipping region',
    'shipping postal-code',
    'shipping country',

    'cc-name',
    'cc-given-name',
    'cc-additional-name',
    'cc-family-name',
    'cc-exp',
    'cc-exp-month',
    'cc-exp-year',
    'cc-number',
    'cc-csc',
    'cc-exp',
    'cc-type',

    'transaction-currency',
    'transaction-amount'
  ]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  startAction: PropTypes.any,
  startAdornment: PropTypes.func,
  endAction: PropTypes.any,
  endAdornment: PropTypes.any,
  containerProps: PropTypes.object,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeDelay: PropTypes.number,
  onFocusIn: PropTypes.func,
  onFocusInDelay: PropTypes.number,
  onFocusOut: PropTypes.func,
  onFocusOutDelay: PropTypes.number,
  color: PropTypes.shape({
    main: PropTypes.string,
    error: PropTypes.string,
    success: PropTypes.string,
    hover: {
      main: PropTypes.string,
      error: PropTypes.string,
      success: PropTypes.string
    },
    focus: {
      main: PropTypes.string,
      error: PropTypes.string,
      success: PropTypes.string
    },

    border: {
      main: PropTypes.string,
      error: PropTypes.string,
      success: PropTypes.string,
      hover: {
        main: PropTypes.string,
        error: PropTypes.string,
        success: PropTypes.string
      },
      focus: {
        main: PropTypes.string,
        error: PropTypes.string,
        success: PropTypes.string
      }
    },

    label: {
      main: PropTypes.string,
      error: PropTypes.string,
      success: PropTypes.string,
      hover: {
        main: PropTypes.string,
        error: PropTypes.string,
        success: PropTypes.string
      },
      focus: {
        main: PropTypes.string,
        error: PropTypes.string,
        success: PropTypes.string
      }
    }
  })
}

export default TextField


export const createName = ({ group, array, name }) => {
  if (group) {
    return `${group}~~~${createName({ array: array, name: name })}~~~`
  }
  let n = array ? `${array}___${name}` : name
  return n + (array ? '___' : '')
}
