import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const customColor = require("randomcolor");

export  function TagInput(props) {
    const {suggestions, form, field, onAdd} = props;
    return (
      <Autocomplete
        options={suggestions}
        getOptionLabel={(option) => option.label}
        
        onChange={(event, newValue)=>{
            
            onAdd(newValue);
        }}
        style={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} fullWidth label="Compétences" variant="outlined" />}
      />
    );
  }
