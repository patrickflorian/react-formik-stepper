import React, { useEffect, useState } from "react";
import { ExperienceForm } from "./ExperienceForm";

export function ExperienceContainer(props) {
  const { form, field, withInput, children } = props;
  const initialChildren = localStorage.getItem("experiences")? JSON.parse(localStorage.getItem("experiences")): [
    {},
  ];
  const [childrenArray, setChildrenArray] = useState(
    initialChildren
      ? initialChildren.map((item) => ({
          Component: ExperienceForm,
          value: {},
        }))
      : []
  );
  const [values, setValues] = useState(initialChildren);
  const [updating, Setupdating] = useState(false);

  function addForm() {
    setChildrenArray([
      ...childrenArray,
      { Component: ExperienceForm, value: {} },
    ]);
  }
  function removeForm(key) {
    setChildrenArray(childrenArray.splice(key-1,1));
    Setupdating(true)
  }

  /** function permettant de sauvegarder la valeur de tous chaque formulaire d'experience */
  function saveItemValue(key, value) {
    form.setFieldValue(
      "experiences",
      childrenArray.map((children, index) => {
        if (index === key) {
          let _children = children;
          _children.value = value;
          return _children;
        } else return children;
      })
    );
    save();
    Setupdating(true);
  }
  /** function permettant de sauvegarder la valeur finale de tous le formulaire */
  function save() {
    form.setFieldValue(
      "experiences",
      childrenArray.map((children) => children.value)
    );
    Setupdating(false);
    setValues(childrenArray.map((children) => children.value));
  }
  useEffect(() => {
    if (updating) {
      save();
    }
    localStorage.setItem("experiences", JSON.stringify(values));
    Setupdating(false)
    return ()=>{
    }
  }, [childrenArray, values, updating]);

  return (
    <>
      {childrenArray.map((item, index) => {
        return (
          <>
            <item.Component
              added
              index={index}
              remove={removeForm}
              onUpdate={saveItemValue}
              errors={form.errors[field.name]&&form.errors[field.name][index]}
              touched={form.touched[field.name]&&form.touched[field.name][index]}
            />
          </>
        );
      })}
      <p onClick={addForm}> + Ajouter une autre experience</p>
    </>
  );
}
