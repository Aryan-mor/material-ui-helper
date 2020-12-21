import TextFieldContainer from "./TextFieldContainer";
import React from "react";
import TextField from "./TextField";
import PropTypes from 'prop-types'
import DefaultTextField from './DefaultTextField'


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
