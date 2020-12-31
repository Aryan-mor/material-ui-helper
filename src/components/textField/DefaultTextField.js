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
  inputStyle:PropTypes.string,
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
