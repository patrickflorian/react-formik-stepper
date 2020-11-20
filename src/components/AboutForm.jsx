import React, {  } from "react";
import { Field } from "formik";
import { Box, Grid } from "@material-ui/core";
import { FormikTextInput, FormikPhoneInput } from "./TextInput";

const AboutForm = (props) => {
 
 const {isCompany}  = props
  return <div className={'col-md-7'}>
    {
      isCompany ? (
    <Box
      paddingBottom={2}
      alignItems={"center"}
      justifyContent={"center"}
      display={"flex"}
    >
      <Grid container>
        
        <Grid item xs={12} sm={12} md={12}>
          <Box paddingBottom={2}>
            <Field
              paddingBottom={2}
              fullWidth
              name="companyName"
              component={FormikTextInput}
              label="Titre de l'entreprise"
            />
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={12} md={12}>
          <Box paddingBottom={2}>
            <Field
              name="activity"
              type="text"
              component={FormikTextInput}
              label="Domaine d'activité"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box paddingBottom={2}>
            <Field
              name="email"
              type="text"
              component={FormikTextInput}
              label="Email"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box paddingBottom={2}>
            <Field
              name="phonenumber"
              type="text"
              component={FormikPhoneInput}
              label="Numero de telephone"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box
      paddingBottom={2}
      alignItems={"center"}
      justifyContent={"center"}
      display={"flex"}
      
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Box paddingBottom={2}>
            <Field
              paddingBottom={2}
              fullWidth
              name="firstName"
              component={FormikTextInput}
              label="First Name"
            />
          </Box>
        </Grid>
        <Grid item md={12} xs={12} sm={12}>
          <Box paddingBottom={2}>
            <Field
              fullWidth
              name="lastName"
              component={FormikTextInput}
              label="Last Name"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box paddingBottom={2}>
            <Field
              name="job"
              type="text"
              component={FormikTextInput}
              label="Votre metier"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box paddingBottom={2}>
            <Field
              name="email"
              type="text"
              component={FormikTextInput}
              label="Email"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box paddingBottom={2}>
            <Field
              name="phonenumber"
              type="text"
              component={FormikPhoneInput}
              label="Numero de telephone"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
    }
  </div>
};

export default AboutForm;
