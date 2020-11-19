import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";

export function LocationInput(props) {
  const _countries = [
    { id: 0, title: "Cameroun" },
    { id: 1, title: "Gabon" },
  ];
  const _towns = [
    { id: 0, title: "Douala", country: 0 },
    { id: 1, title: "Yaoundé", country: 0 },
  ];
  const _quarters = [
    { id: 0, title: "Makepe", country: 0, town: 0 },
    { id: 1, title: "Bonaberi", country: 0, town: 0 },
  ];
  const { form, field, onAdd } = props;
  const [countries, setCountries] = useState(_countries);
  const [towns, setTowns] = useState(_towns);
  const [quarters, setQuaters] = useState(_quarters);

  let values = field.value;
  function onCountrySelect(newValue) {
    if (newValue) {
      form.setFieldValue("location", { ...values, country: newValue });
      setTowns(_towns.filter((item) => item.country === newValue.id));
    } else {
      setTowns(_towns);
    }
  }

  function onTownSelect(newValue) {
    if (newValue) {
      form.setFieldValue("location", { ...values, town: newValue });
      setQuaters(_quarters.filter((item) => item.town === newValue.id));
    } else {
      setQuaters(_quarters);
    }
  }

  function onQuaterSelect(newValue) {
    if (newValue)
      form.setFieldValue("location", { ...values, quarter: newValue });
  }

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
            <TextField
              {...params}
              fullWidth
              label="Pays"
              variant="outlined"
            />
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
            <TextField
              {...params}
              fullWidth
              label="Ville"
              variant="outlined"
            />
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
