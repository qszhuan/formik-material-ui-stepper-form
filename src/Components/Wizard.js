import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Debug } from "../Debug";

import Step1 from "./Step1";
import Step2 from "./Step2";
import WizardStep from "./WizardStep";

// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.


const steps = [
  <WizardStep
    onSubmit={(values) => console.log("Step1 onSubmit", values)}
    validationSchema={Yup.object({
      firstName: Yup.string().required("required"),
      lastName: Yup.string().required("required"),
    })}
  >
    <Step1 />
  </WizardStep>,
  <WizardStep
    onSubmit={(values) => console.log("Step2 onSubmit", values)}
    validationSchema={Yup.object({
      email: Yup.string()
        // .email("Invalid email address")
        // .required("required")
        .when(["firstName", "lastName"], {
          is: (firstName, lastName) => {
            console.log(firstName, lastName);
            let x = firstName.length === 2 && lastName.length === 3;
            console.log(x);
            return x;
          },
          then: Yup.string()
            .email("Invalid email address")
            .required("required.."),
          otherwise: Yup.string().required("required string..."),
        }),
    })}
  >
    <Step2 />
  </WizardStep>,
];
const stepHeaders = ["Basic information", "Tell me more"];

const Wizard = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0);
  // const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form>
          <p>
            Step {stepNumber + 1} of {totalSteps}
          </p>
          {step}
          <div style={{ display: "flex" }}>
            {stepNumber > 0 && (
              <button onClick={() => previous(formik.values)} type="button">
                Back
              </button>
            )}
            <div>
              <button disabled={formik.isSubmitting} type="submit">
                {isLastStep ? "Submit" : "Next"}
              </button>
            </div>
          </div>
          <Debug />
        </Form>
      )}
    </Formik>
  );
};

export default Wizard;
