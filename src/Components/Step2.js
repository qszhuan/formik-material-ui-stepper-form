import React from "react";
import WizardStep from "./WizardStep";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";

const Step2 = () => {
  const { values, submitForm } = useFormikContext();

  return (
    <>
      {JSON.stringify(values, null, 2)}

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
        <label htmlFor="social">Social Media</label>
        <Field name="social.facebook" />
        <Field name="social.twitter" />
      </div>
    </>
  );
};

export default Step2;
