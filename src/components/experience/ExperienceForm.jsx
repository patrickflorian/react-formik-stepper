import { Box, Divider, Grid } from '@material-ui/core';
import { Field } from 'formik';
import React, { useEffect, useState } from 'react';
import { TextInput, FormikDateInput } from '../TextInput';

export function ExperienceForm(props){
  const  { added , remove, index, onUpdate,form , errors,touched} = props;
  const initialValues = (localStorage.getItem("experiences"))? JSON.parse(localStorage.getItem("experiences"))[index] : null;
  const [value, setValue] = useState(initialValues?initialValues:{
    position :'',
    begin_date : '',
    end_date : '',
    company :'',
    description :''
  })
  function onInputChange(e){
    const name = e.target.name;
    const inputvalue = e.target.value;
    let newValue = value;
    newValue[name] = inputvalue;
    setValue(newValue)
    onUpdate(index,value);
  }
    console.log(touched)

  useEffect(()=>{
  }, [value])

    return <> <Box
    paddingBottom={2}
    alignItems={"center"}
    justifyContent={"center"}
    display={"flex"}
  >
    <Grid container>
      <Grid item xs={12} sm={12} md={6}>
        <Box paddingBottom={2}>
          <TextInput
            paddingBottom={2}
            fullWidth
            name="position"
            label="Poste occupé"
            onChange={onInputChange}
            value={value.position}
            error={touched && touched.position &&errors && errors.position &&errors.position}
          />
        </Box>
      </Grid>
      <Grid item md={6} xs={12} sm={12}>
        <Box paddingBottom={2}>
          <TextInput
            fullWidth
            name="company"
            label="Entreprise"
            onChange={onInputChange}
            value={value.company}
            error={touched && touched.company &&errors && errors.company &&errors.company}
          />
        </Box>
      </Grid>
      <Grid item md={6} xs={12} sm={12}>
        <Box paddingBottom={2}>
          <FormikDateInput
            fullWidth
            name="begin_date"
            label="Date de debut"
            onChange={onInputChange}
            value={value.begin_date}
            error={touched && touched.begin_date &&errors && errors.begin_date &&errors.begin_date}
          />
        </Box>
      </Grid>
      <Grid item md={6} xs={12} sm={12}>
        <Box paddingBottom={2}>
          <FormikDateInput
            fullWidth
            name="end_date"
            label="Date de fin"
            onChange={onInputChange}
            value={value.end_date}
            error={touched && touched.end_date &&errors && errors.end_date &&errors.end_date}
          />
        </Box>
      </Grid>
      <Grid item md={12} xs={12} sm={12}>
        <Box paddingBottom={2}>
          <TextInput
            fullWidth
            name="description"
            label="Description de la tâche effectuée"
            onChange={onInputChange}
            value={value.description}
            error={touched && touched.description &&errors && errors.description &&errors.description}
          />
        </Box>
      </Grid>
    </Grid>
    {
      added && index!==0 && <p onClick={()=>{ remove(index)}}>retirer</p>
    }
    
  </Box><Divider className={"mb-5"} /></>
}