import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Debug } from "./Debug";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";
import WizardStep from "./Components/WizardStep";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

const App = () => (
  <div>
    <h1>Formik Multistep Wizard</h1>
    <Wizard
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        social: {
          facebook: "x",
          twitter: "x",
        },
      }}
      onSubmit={async (values) =>
        sleep(300).then(() => console.log("Wizard submit", values))
      }
    >
      {/* <WizardStep
        onSubmit={() => console.log("Step1 onSubmit")}
        validationSchema={Yup.object({
          firstName: Yup.string().required("required"),
          lastName: Yup.string().required("required"),
        })}
      >
        <Step1 />
      </WizardStep>
      <WizardStep
        onSubmit={() => console.log("Step2 onSubmit")}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("required"),
        })}
      >
        <Step2 />
      </WizardStep> */}
    </Wizard>
  </div>
);

export default App;
