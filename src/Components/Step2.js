import React from 'react'
import WizardStep from './WizardStep';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const Step2 = ()=>(<WizardStep
    onSubmit={() => console.log("Step1 onSubmit")}
    validationSchema={Yup.object({
      firstName: Yup.string().required("required"),
      lastName: Yup.string().required("required")
    })}
  >
    <div>
      <label htmlFor="firstName">First Name</label>
      <Field
        autoComplete="given-name"
        component="input"
        id="firstName"
        name="firstName"
        placeholder="First Name"
        type="text"
      />
      <ErrorMessage className="error" component="div" name="firstName" />
    </div>
    <div>
      <label htmlFor="lastName">Last Name</label>
      <Field
        autoComplete="family-name"
        component="input"
        id="lastName"
        name="lastName"
        placeholder="Last Name"
        type="text"
      />
      <ErrorMessage className="error" component="div" name="lastName" />
    </div>
  </WizardStep>);


export default Step2;