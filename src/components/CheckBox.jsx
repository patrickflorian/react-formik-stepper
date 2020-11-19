import { CheckboxWithLabel } from 'formik-material-ui';
import React, {useState} from 'react';


export const CheckBox = (props)=>{
    const {
        
        field : { onChange, ...restfield},
        form: { errors, touched }, 
        onCheck, ...rest 
      } = props;
        
    return <CheckboxWithLabel onChange={(e)=>{
        onCheck(e.target.value);
        onChange(e)
    }} {...restfield} {...rest}/>
}