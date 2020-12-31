import React from 'react'
import TextField from './TextField'
import TextFieldContainer from './TextFieldContainer'
import PropTypes from 'prop-types'


function DefaultTextField(pr) {

  const {
    name,
    defaultValue,
    variant,
    label,
    multiline,
    rows,
    rowsMax,
    required,
    color,
    type,
    inputStyle,
    inputProps,
    autoComplete,
    disabled,
    textFieldProps = {},
    startAction,
    startAdornment,
    endAction,
    endAdornment,
    onChange,
    onChangeDelay,
    autoFocus,
    onFocusIn,
    onFocusOut,
    ...props
  } = pr

  return (
    <TextFieldContainer
      name={name}
      defaultValue={defaultValue}
      onChangeDelay={onChangeDelay}
      type={type}
      onChange={onChange}
      render={(ref, { props }) => (
        <TextField
          {...props}
          variant={variant}
          inputRef={ref}
          name={name}
          color={color}
          disabled={disabled}
          multiline={multiline}
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
          autoComplete={autoComplete}
          onFocusIn={onFocusIn}
          onFocusOut={onFocusOut}
          {...textFieldProps}
          style={{
            ...textFieldProps.style
          }}/>
      )}
      {...props}
      {...props.containerProps}
    />
  )
}

DefaultTextField.defaultProps = {
  onChangeDelay: 600
}

DefaultTextField.propTypes = {
  name: PropTypes.any.isRequired,
  defaultValue: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  label: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  onChangeDelay: PropTypes.number,
  required: PropTypes.bool,
  type: PropTypes.any,
  inputStyle: PropTypes.object,
  inputProps: PropTypes.object,
  autoComplete: PropTypes.oneOf([
    "off",
    "name",
    "email",
    "tel",
    "username",
    "honorific-prefix",
    "language",
    "impp",
    "url",
    "photo",

    "organization-title",
    "organization",

    "new-password",
    "current-password",
    "one-time-code",

    "given-name",
    "additional-name",
    "family-name",
    "honorific-suffix",
    "nickname",
    "bday",
    "bday-day",
    "bday-month",
    "bday-year",
    "sex",

    "tel",
    "tel-country-code",
    "tel-national",
    "tel-area-code",
    "tel-local",
    "tel-extension",


    "street-address",
    "address-line1",
    "address-line2",
    "address-line3",
    "address-level4",
    "address-level3",
    "address-level2",
    "address-level1",
    "country",
    "country-name",
    "postal-code",

    "shipping street-address",
    "shipping locality",
    "shipping region",
    "shipping postal-code",
    "shipping country",

    "cc-name",
    "cc-given-name",
    "cc-additional-name",
    "cc-family-name",
    "cc-exp",
    "cc-exp-month",
    "cc-exp-year",
    "cc-number",
    "cc-csc",
    "cc-exp",
    "cc-type",

    "transaction-currency",
    "transaction-amount",
  ]),
  disabled:PropTypes.bool,
  textFieldProps: PropTypes.object,
  autoFocus: PropTypes.bool,
  startAction: PropTypes.any,
  startAdornment: PropTypes.any,
  endAction: PropTypes.any,
  endAdornment: PropTypes.any,
  onChange: PropTypes.func,
  onFocusIn: PropTypes.func,
  onFocusOut: PropTypes.func,
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
    },
  })
}

export default DefaultTextField
