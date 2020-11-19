import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MapInput } from "./Map";
import { LocationInput } from "./LocationInput";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    display: 'block',
  },
  input: {
    border: 0,
    "&:focus": {
      outline: 0,
    },
  },
}));

export function LocationContainer(props) {
  const classes = useStyles();
  const { form, field , withInput} = props;
  const values = field.value;

  const competences = [
    { id: 0, label: "Informaticien" },
    { id: 2, label: "Electronique" },
    { id: 3, label: "Electromenager" },
  ];

  /*** function to fetch all cometences when component did mount */
  useEffect(() => {
    
    return () => {}
  },[field.value]);
  return (
    <div className={classes.root}>
      {withInput && (
        <LocationInput
          field={field}
          form={form}
          className={classes.input}
        />
      )}
      {
          form.touched && form.errors &&<span>{form.errors[field.name]}</span>
      }
      <MapInput/>
    </div>
  );
}