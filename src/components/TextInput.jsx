import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { fieldToSelect } from "formik-material-ui";
import 'react-phone-number-input/style.css'
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    
    input: {
     border: "none"
    },
  }));

  /** default text input component */
const TextInput = (props) => {
  const { fullWidth, placeholder, label, value, onChange ,error ,...rest } = props;

  const [inputValue, setValue] = useState("value");
  function handleInputChange(e) {
    setValue(e.target.value);
    onChange(e);
  }
  
  return (
    <>
    <div className="input-group mb-3 col-md-12 col-sm-12">
      <input
        type="text"
        className="form-control"
        aria-label={label}
        placeholder={label}
        value={value}
        onChange={handleInputChange}
        {...rest}
      />
      {/*<div class="input-group-append">
            <span class="input-group-text bg-white" ><span class="fa fa-chevron-down"></span></span>
        </div>*/}
    </div>
    { error && <p className="small text-danger text-right mr-2">{error}</p>}
    </>
  );
};

/** fomrik text input component */
const FormikTextInput = (props) => {
  const {
    fullWidth,
    placeholder,
    label,
    field,
    form: { errors, touched ,...rest_f},
    ...rest
  } = props;
  return (
    <>
      <div className="input-group mb-3 col-md-12 col-sm-12">
        <input
          type="text"
          className={clsx(["form-control col-md-12 col-lg-12 col-sm-12",touched[field.name] && errors[field.name]&&"is-invalid"])}
          {...field}
          aria-label={label}
          placeholder={label}
        />
        {/*<div class="input-group-append">
            <span class="input-group-text bg-white" ><span class="fa fa-chevron-down"></span></span>
        </div>*/}
      </div>
      {errors && touched[field.name] && <p className="small text-danger text-right mr-3">{errors[field.name]}</p>}
    </>
  );
};
const FormikDateInput = (props) => {
  const { fullWidth, placeholder, label, value, onChange ,error ,...rest } = props;

  const [inputValue, setValue] = useState("value");
  function handleInputChange(e) {
    setValue(e.target.value);
    onChange(e);
  }
  
  return (
    <>
    <div className="input-group mb-3 col-md-12 col-sm-12">
      <input
        type="date"
        className="form-control"
        aria-label={label}
        placeholder={label}
        value={value}
        onChange={handleInputChange}
        {...rest}
      />
      {/*<div class="input-group-append">
            <span class="input-group-text bg-white" ><span class="fa fa-chevron-down"></span></span>
        </div>*/}
    </div>
    { error &&  <p className="small text-danger text-right mr-2">{error}</p>}
    </>
  );
};


/** formik phone input component */
const FormikPhoneInput = (props) => {
  const {
    fullWidth,
    placeholder,
    label,
    field,
    form: { errors, touched, setFieldValue , ...restForm},
    ...rest
  } = props;
console.log(touched);
  return (
    <>
      <div className={clsx(["input-group mb-3 col-md-12 col-sm-12", errors[field.name]?"is-invalid":"is-valid"])}>
        <PhoneInput
          defaultCountry="CM"
          value={field.value}
          onChange={(value) => setFieldValue("phonenumber", value)}
          aria-label={label}
          placeholder={label}
        />
        {/*<div class="input-group-append">
            <span class="input-group-text bg-white" ><span class="fa fa-chevron-down"></span></span>
        </div>*/}
      </div>
      {  errors[field.name] &&<p className="small text-danger text-right mr-2">{errors[field.name]}</p>}
    </>
  );
};

export { TextInput, FormikTextInput, FormikPhoneInput, FormikDateInput };
