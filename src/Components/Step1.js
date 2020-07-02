import React from "react";
import WizardStep from "./WizardStep";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import TextField from "@material-ui/core/TextField";
import InputField from "./InputField";
import { Grid } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
const Step1 = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldTouched,
  } = useFormikContext();
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <label htmlFor="firstName">First Name</label>
          <TextField
            id="firstName"
            name="firstName"
            helperText={touched.firstName ? errors.firstName : ""}
            error={touched.firstName && Boolean(errors.firstName)}
            value={values.firstName}
            onChange={change.bind(null, "firstName")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="firstName">Last Name</label>
          <InputField name="lastName" fullWidth />
        </Grid>
      </Grid>
    </>
  );
};

export default Step1;
