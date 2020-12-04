import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tag from "./Tag";
import { TagInput } from "./TagInput";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    
  },
  value : {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  input: {
    border: 0,
    "&:focus": {
      outline: 0,
    },
  },
}));

export default function TagContainer(props) {
  const classes = useStyles();
  const { withInput } = props;
  const { tags, form, field } = props;
  function onDelete(tag) {
    form.setFieldValue(
      "competences",
      field.value.filter((item) => tag.id !== item.id)
    );
  }
  const values = field.value;

  const competences = [
    { id: 0, label: "Informaticien" },
    { id: 2, label: "Electronique" },
    { id: 3, label: "Electromenager" },
    { id: 4, label: "Mecanique" },
    { id: 5, label: "Menuserie" },
    { id: 6, label: "Maconnerie" },
  ];
  const [suggestions, setSuggestions] = useState(competences);

  function onAdd(value) {
    setSuggestions(
      competences.filter((item) => {
        let notfind = true;
        field.value.forEach((value) => {
          if (item.label === value.label) {
            notfind = false;
          }
        });
        return notfind;
      })
    );
    if (value) form.setFieldValue("competences", [...values, { ...value }]);
  }
  /*** function to fetch all cometences when component did mount */
  useEffect(() => {
    setSuggestions(
        competences.filter((item) => {
          let notfind = true;
          field.value.forEach((value) => {
            if (item.label === value.label) {
              notfind = false;
            }
          });
          return notfind;
        })
      );
    return () => {}
  },[field.value]);
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={12}  xs={12} md={6} className={classes.value}>
        {field && field.value.length!==0 ?
        field.value.map((tag, index) => {
          return <Tag key={"tag_"+index} tag={tag} handleDelete={onDelete} />;
        }) : 'Aucune Competence choisie'}
        </Grid>
        <Grid item sm={12}  xs={12} md={6}>
          {withInput && (
                  <TagInput
                    tags={tags}
                    suggestions={suggestions}
                    onAdd={onAdd}
                    field={field}
                    form={form}
                    className={classes.input}
                  />
                )}
                {
                    form.touched && form.errors &&<span>{form.errors[field.name]}</span>
                }
        </Grid>
      </Grid>
      
      
    </div>
  );
}
