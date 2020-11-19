import { fieldToSelect } from "formik-material-ui";
import React, { useState } from "react";

const TextInput = (props) => {
  const {
    fullWidth,
    placeholder,
    label,
    value, 
    onChange,
    ...rest
  } = props;

  const [inputValue, setValue] = useState('value')
  function handleInputChange(e){
    setValue(e.target.value)
    onChange(e)
  }
  return (
    <div className="input-group mb-3 col-md-12 col-sm-12">
      <input
        type="text"
        class="form-control"
        aria-label={label}
        placeholder={label}
        aria-describedby="basic-addon2"
        value={value}
        onChange={handleInputChange}
        {...rest}
      />
      {/*<div class="input-group-append">
            <span class="input-group-text bg-white" ><span class="fa fa-chevron-down"></span></span>
        </div>*/}
      
    </div>
  );
};

const FormikTextInput = (props) => {
  const {
    fullWidth,
    placeholder,
    label,
    field,
    form: { errors, touched },
    ...rest
  } = props;


  return (
    <div className="input-group mb-3 col-md-12 col-sm-12">
      <input
        type="text"
        class="form-control"
        {...field}
        aria-label={label}
        placeholder={label}
        aria-describedby="basic-addon2"
      />
      {/*<div class="input-group-append">
            <span class="input-group-text bg-white" ><span class="fa fa-chevron-down"></span></span>
        </div>*/}
      {errors && touched && <p className="text-error">{errors[field.name]}</p>}
    </div>
  );
};

export { TextInput, FormikTextInput };
