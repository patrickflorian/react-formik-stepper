import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MapInput } from "./Map";
import { LocationInput } from "./LocationInput";
import cameroun_geojson from '../../data/cameroun.json';
import gabon_geojson from '../../data/gabon.json';
import douala_geojson from '../../data/douala.json';
import yaounde_geojson from '../../data/yaounde.json';
import clsx from "clsx";
const useStyles = makeStyles(() => ({
  root: {
    height: 400,
    display: "block",
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
  const { form, field, withInput } = props;
  const _countries = [
    { id: 0, title: "Cameroun", data: cameroun_geojson },
    { id: 1, title: "Gabon", data: gabon_geojson },
  ];
  const _towns = [
    {
      id: 0,
      title: "Douala",
      country: 0,
      latlng: { lat: 4.061536, lng: 9.786072 },
      data :douala_geojson
    },
    {
      id: 1,
      title: "Yaoundé",
      country: 0,
      latlng: { lat: 3.844119, lng: 11.501346 },
      data : yaounde_geojson
    },
  ];
  const _quarters = [
    {
      id: 0,
      title: "Makepe",
      country: 0,
      town: 0,
      latlng: { lat: 4.0849531, lng: 9.7486781 },
    },
    {
      id: 1,
      title: "Bonaberi",
      country: 0,
      town: 0,
      latlng: { lat: 4.0849531, lng: 9.7486781 },
    },
  ];
  const [countries] = useState(_countries);
  const [towns, setTowns] = useState(_towns);
  const [quarters, setQuaters] = useState(_quarters);
  const [location, setLocation] = useState({ lat: 4.0849531, lng: 9.7486781 });

  let values = field.value;
  function onCountrySelect(newValue) {
    if (newValue) {
      setLocation(newValue.latlng);
      form.setFieldValue("location", { ...values, country: newValue });
      setTowns(_towns.filter((item) => item.country === newValue.id));
    } else {
      setTowns(_towns);
    }
  }

  function onTownSelect(newValue) {
    if (newValue) {
      setLocation(newValue.latlng);
      form.setFieldValue("location", { ...values, town: newValue });
      setQuaters(_quarters.filter((item) => item.town === newValue.id));
    } else {
      setQuaters(_quarters);
    }
  }

  function onQuaterSelect(newValue) {
    if (newValue) {
      setLocation(newValue.latlng);
      form.setFieldValue("location", { ...values, quarter: newValue });
    }
  }

  /*** function to fetch all cometences when component did mount */
  useEffect(() => {
    return () => {};
  }, [field.value]);
  return (
    <div className={clsx([classes.root,'ml-3'])}>
      {withInput && (
        <LocationInput
          field={field}
          form={form}
          className={classes.input}
          countries={countries}
          towns={towns}
          quarters={quarters}
          onQuaterSelect={onQuaterSelect}
          onTownSelect={onTownSelect}
          onCountrySelect={onCountrySelect}
        />
      )}
      {form.touched && form.errors && <span>{form.errors[field.name]}</span>}
      <MapInput
        location={location}
        countries={_countries}
        towns={_towns}
        quarters={_quarters}
      />
    </div>
  );
}
