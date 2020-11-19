import { Box, Grid } from "@material-ui/core";
import { Field } from "formik";
import React, { useState } from "react";
import TagContainer from "./Tags/TagContainer";
const customColor = require("randomcolor");
export function Competences(props) {
  const [tags, setTags] = useState([
    { id: 0, label: "Informaticien", color: customColor({ hue: "blue" }) },
    { id: 2, label: "Electronique", color: customColor({ hue: "blue" }) },
    { id: 3, label: "Electromenager", color: customColor({ hue: "blue" }) },
  ]);
  
  return (
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
              name="competences"
              component={TagContainer}
              label="First Name"
              withInput
              tags={tags}
              
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
