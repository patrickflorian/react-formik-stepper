import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Box, Grid, TextField } from "@material-ui/core";
import { FormikTextInput } from "./TextInput";
import { CheckboxWithLabel } from "formik-material-ui";
import { CheckBox } from "./CheckBox";

const AboutForm = (props) => {
 
 const {isCompany}  = props
  return isCompany ? (
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
        <Grid item md={12}>
          <Box paddingBottom={2}>
            <Field
              name="email"
              type="text"
              component={FormikTextInput}
              label="Email"
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box paddingBottom={2}>
            <Field
              name="phonenumber"
              type="text"
              component={FormikTextInput}
              label="Numero de telephone"
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box paddingBottom={2}>
            <Field
              name="phonenumber"
              type="text"
              component={FormikTextInput}
              label="Domaine d'activité"
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
        <Grid item md={12}>
          <Box paddingBottom={2}>
            <Field
              name="email"
              type="text"
              component={FormikTextInput}
              label="Email"
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box paddingBottom={2}>
            <Field
              name="phonenumber"
              type="text"
              component={FormikTextInput}
              label="Numero de telephone"
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box paddingBottom={2}>
            <Field
              name="job"
              type="text"
              component={FormikTextInput}
              label="Votre metier"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutForm;
