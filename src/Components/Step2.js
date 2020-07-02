import React from "react";
import WizardStep from "./WizardStep";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";

const Step2 = (props) => {
  const { values, submitForm } = useFormikContext();

  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <Field
          autoComplete="email"
          component="input"
          id="email"
          name="email"
          placeholder="Email"
          type="text"
        />
        <ErrorMessage className="error" component="div" name="email" />
      </div>
    </>
  );
};

export default Step2;
