import React from 'react'
import TextField from './TextField'
import TextFieldContainer from './TextFieldContainer'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getSafe, gLog, tryIt } from '../../utils/Helper'

function DefaultTextField(pr) {

  const {
    name,
    value,
    className,
    defaultValue,
    variant,
    label,
    multiline,
    rows,
    rowsMax,
    required,
    color,
    type,
    error,
    placeholder,
    inputStyle,
    inputProps,
    InputProps,
    autoComplete,
    disabled,
    textFieldProps = {},
    startAction,
    startAdornment,
    endAction,
    endAdornment,
    errorPatterns,
    renderGlobalErrorText,
    onChange,
    onChangeDelay,
    onChangeTextField,
    onChangeTextFieldDelay,
    autoFocus,
    onFocusIn,
    onFocusInDelay,
    onFocusOut,
    onFocusOutDelay,
    ...props
  } = pr


  function handleFocusIn() {
    tryIt(()=>onFocusIn())
    gLog('asfaskjfkjaskjfkasj handleFocusIn')
  }

  function handleFocusOut() {
    tryIt(()=>onFocusOut())
    gLog('asfaskjfkjaskjfkasj handleFocusOut')
  }


  return (
    <TextFieldContainer
      name={name}
      defaultValue={defaultValue}
      onChangeDelay={onChangeDelay}
      type={type}
      onChange={onChange}
      errorPatterns={errorPatterns}
      renderGlobalErrorText={renderGlobalErrorText}
      render={(ref, { errorIndex, props }) => {
        return (
          <TextField
            {...props}
            className={className}
            variant={variant}
            inputRef={ref}
            value={value}
            name={name}
            defaultValue={defaultValue}
            color={color}
            type={type}
            disabled={disabled}
            multiline={multiline}
            placeholder={placeholder}
            rows={multiline ? rows : undefined}
            rowsMax={multiline ? rowsMax : undefined}
            fullWidth={true}
            label={label}
            startAction={startAction}
            startAdornment={startAdornment}
            endAdornment={endAdornment}
            endAction={endAction}
            inputStyle={inputStyle}
            required={required}
            autoFocus={autoFocus}
            inputProps={inputProps}
            InputProps={InputProps}
            autoComplete={autoComplete}
            onChange={onChangeTextField}
            onChangeDelay={onChangeTextFieldDelay}
            onFocusIn={handleFocusIn}
            onFocusInDelay={onFocusInDelay}
            onFocusOut={handleFocusOut}
            onFocusOutDelay={onFocusOutDelay}
            error={error || (_.isNumber(errorIndex) && errorIndex !== -1)}
            {...textFieldProps}
            style={{
              ...textFieldProps.style
            }}/>
        )
      }}
      {...props}
      {...props.containerProps}/>
  )

}

DefaultTextField.defaultProps = {
  onChangeDelay: 600,
  inputProps: {},
  InputProps: {}
}

DefaultTextField.propTypes = {
  name: PropTypes.any.isRequired,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  label: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  required: PropTypes.bool,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'email', 'hidden', 'password', 'search', 'tel', 'url']),
  inputStyle: PropTypes.object,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  autoComplete: PropTypes.oneOf([
    'on',
    'off',
    'name',
    'email',
    'tel',
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
  textFieldProps: PropTypes.object,
  autoFocus: PropTypes.bool,
  startAction: PropTypes.any,
  startAdornment: PropTypes.any,
  endAction: PropTypes.any,
  endAdornment: PropTypes.any,
  errorPatterns: PropTypes.array,
  renderGlobalErrorText: PropTypes.func,
  onChange: PropTypes.func,
  onChangeDelay: PropTypes.number,
  onChangeTextField: PropTypes.func,
  onChangeTextFieldDelay: PropTypes.number,
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

export default DefaultTextField
