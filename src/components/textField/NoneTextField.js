import TextFieldContainer from './TextFieldContainer'
import React from 'react'
import TextField from './TextField'
import PropTypes from 'prop-types'


function NoneTextField({name,defaultValue,containerProps={},textFieldProps={},...props}) {
    return(
        <TextFieldContainer
            name={name}
            defaultValue={defaultValue}
            render={(ref, {props}) => (
                <TextField
                    {...props}
                    inputRef={ref}
                    name={name}
                    type={'hidden'}
                    {...textFieldProps}
                    style={{
                        display: 'none',
                        ...textFieldProps.style
                    }}/>
            )}
            {...containerProps}
        />
    )
}


NoneTextField.propTypes = {
  name:PropTypes.any,
  defaultValue:PropTypes.string,
  containerProps:PropTypes.object,
  textFieldProps:PropTypes.object,
}

export default NoneTextField;
