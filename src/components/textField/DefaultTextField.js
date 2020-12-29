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
    type,
    textFieldProps = {},
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
          multiline={multiline}
          rows={multiline ? rows : undefined}
          rowsMax={multiline ? rowsMax : undefined}
          fullWidth={true}
          label={label}
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
  textFieldProps: PropTypes.object,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onFocusIn: PropTypes.func,
  onFocusOut: PropTypes.func
}

export default DefaultTextField
