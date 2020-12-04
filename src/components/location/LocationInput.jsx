
import React from "react";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
export function LocationInput(props) {
  const {onCountrySelect, onTownSelect, onQuaterSelect, countries, quarters, towns} = props;

  return (
    <Grid container>
      <Grid item md={4}>
        <Autocomplete
          options={countries}
          getOptionLabel={(option) => option.title}
          onChange={(event, newValue) => {
            onCountrySelect(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} fullWidth label="Pays" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <Autocomplete
          options={towns}
          getOptionLabel={(option) => option.title}
          onChange={(event, newValue) => {
            onTownSelect(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} fullWidth label="Ville" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <Autocomplete
          options={quarters}
          getOptionLabel={(option) => option.title}
          onChange={(event, newValue) => {
            onQuaterSelect(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Quartier"
              variant="outlined"
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
