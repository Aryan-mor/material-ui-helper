import React, {useEffect, useLayoutEffect} from 'react'
import _ from "lodash";
import Box from "@material-ui/core/Box";
import {
    notValidTextField,
    textFieldActived,
    textFieldNewValue,
    textFieldRenderValue
} from "./textField/TextFieldContainer";


function getGroup(text) {
    try {
        const ch = text.match('(.+)~~~(.+)~~~');
        if (ch)
            return ch
    } catch (e) {
    }
    return []
}

function getArray(text) {
    try {
        const ch = text.match('(.+)___(.+)___');
        if (ch)
            return ch
    } catch (e) {
    }
    return []
}

function serialize(ref) {
    let data = {};
    const form = ref.current;
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];

        if (element.disabled && element.getAttribute(textFieldActived) !== "true")
            continue;
        const type = element.type;
        let name =element.name.trim();

        if (name === "")
            continue

        const nodeName = element.nodeName.toLowerCase();
        let newData = {};
        //region CheckGroup
        const gp = getGroup(name);
        let group = gp[1];
        name = gp[2] ? gp[2] : name;
        const ar = getArray(name);
        const array = ar[1];
        name = ar[2] ? ar[2] : name;

        try {
            newData = group ? data[group][name] : data[name]
        } catch (e) {
        }
        //endregion CheckGroup
        if (nodeName === "input"||nodeName === "textarea") {
            switch (type) {
                case "radio":
                case "checkbox":
                    if (element.checked) {
                        newData = element.value;
                    }
                    break;
                default:
                    newData = element.getAttribute(textFieldRenderValue) || element.value;
            }
        } else if (nodeName === "select") {
            switch (type) {
                case "select-one":
                    newData = element.value;
                    break;
                case "select-multiple":
                    for (let j = 0; j < element.options.length; j++) {
                        if (element.options[j].selected) {
                            newData = element.value;
                        }
                    }
                    break;
            }
        } else if (nodeName === "button") {
            switch (type) {
                case "reset":
                case "submit":
                case "button":
                    newData = element.value;
                    break;
            }
        }

        if (newData === undefined)
            continue;

        if (group) {
            if (!data[group])
                data[group] = {};
            if (array) {
                if (!_.isArray(data[group][array]))
                    data[group][array] = [];
                const val = {};
                val[name] = newData;
                data[group][array].push(val);
                continue
            }
            data[group][name] = newData;
            continue;
        }

        if (array) {
            if (!_.isArray(data[array]))
                data[array] = [];
            const val = {};
            val[name] = newData;
            data[array].push(val);
            continue
        }
        data[name] = newData;
    }
    return data
}

let timer = {};
let onChangeTimer = {};
export const notValidFormController = "form-not-valid";

export default function FormControl({
                                        name = "form",
                                        innerref,
                                        checkInterval = 1000,
                                        onChange,
                                        onChangeInterval = 4000,
                                        onSubmit,
                                        ...props
                                    }) {
    useEffect(() => {
        return () => {
            clearTimeout(timer[name]);
            _.remove(timer, (v, k) => k === name);
            clearTimeout(timer[onChangeTimer]);
            _.remove(onChangeTimer, (v, k) => k === name);
        }
    }, []);

    useLayoutEffect(() => {
        innerref.current.serialize = () => {
            return serialize(innerref)
        };
        innerref.current.hasError = () => {
            const err = checkError();
            setAttr(err);
            return err;
        };
        innerref.current.getErrorElement = () => {
            try {
                const elName = innerref.current.getAttribute(notValidFormController);
                return innerref.current.querySelector(`input[name*=${elName}]`)
            } catch (e) {
                return null
            }
        };
        setAttr(checkError());
        const config = {attributes: true, childList: true, subtree: true};
        const callback = function (mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type !== 'attributes' || mutation.attributeName === textFieldNewValue) {
                    if (mutation.attributeName === notValidTextField) {
                        clearTimeout(timer[name]);
                        timer[name] = setTimeout(() => {
                            setAttr(checkError());
                        }, checkInterval);
                    }
                    clearTimeout(onChangeTimer[name]);
                    if (onChange) {
                        onChangeTimer[name] = setTimeout(() => {
                            onChange();
                        }, onChangeInterval);
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(innerref.current, config);
        return () => {
            observer.disconnect();
        }
    }, []);

    function setAttr(error) {
        try {
            if (!error) {
                innerref.current.removeAttribute(notValidFormController);
                return
            }
            innerref.current.setAttribute(notValidFormController, error);
        } catch (e) {
            console.error("FormController::setAttr", e)
        }
    }

    //region Functions
    function checkError() {
        let hasError = false;
        try {
            let nodes = innerref.current.getElementsByTagName('input');
            _.forEach(nodes, function (value) {
                try {
                    if (value.hasError()) {
                        hasError = value.name;
                        return false
                    }
                } catch (e) {
                }
            });
        } catch (e) {
        }
        // if (hasError)
        //     console.log("element has error -> " + hasError, elements)
        return hasError
    }

    //endregion Functions


    return (
        <Box ref={innerref}
             id={name}
             name={name}
             component="form"
             {...props}
             formcontrol="true"
             onSubmit={(e)=>{
                 e.preventDefault();
                 if(onSubmit)
                     onSubmit()
             }}>
            {props.children}
        </Box>
    )
}
