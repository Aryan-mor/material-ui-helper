import React from 'react'
import TextField from './TextField'
import TextFieldContainer from './TextFieldContainer'
import PropTypes from 'prop-types'


function DefaultTextField(pr) {

  const { name, defaultValue, variant, label, multiline, rows, rowsMax, required, type, textFieldProps = {}, ...props } = pr

  return (
    <TextFieldContainer
      name={name}
      defaultValue={defaultValue}
      onChangeDelay={600}
      type={type}
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

DefaultTextField.propTypes = {
  name:PropTypes.any,
  defaultValue:PropTypes.string,
  variant:PropTypes.oneOf(["filled","outlined","standard"]),
  label: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  required: PropTypes.bool,
  type: PropTypes.any,
  textFieldProps: PropTypes.object,
}

export default DefaultTextField
