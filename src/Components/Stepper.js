import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import WizardStep from "./WizardStep";
import * as Yup from "yup";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { Formik, Form } from "formik";
import { Debug } from "../Debug";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  stepper: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '980px',
    margin: 'auto',
    backgroundColor: "" 
  },
}));

function getSteps() {
  return ["Basic information", "Tell me more"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <WizardStep
          onSubmit={(values) => console.log("Step1 onSubmit", values)}
          validationSchema={Yup.object({
            firstName: Yup.string().required("required"),
            lastName: Yup.string().required("required"),
          })}
        >
          <Step1 />
        </WizardStep>
      );
    case 1:
      return (
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
        </WizardStep>
      );
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

export default function HorizontalLinearStepper({ initialValues, onSubmit }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [snapshot, setSnapshot] = useState(initialValues);

  const handleNext = (values) => {
    setSnapshot(values);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (values) => {
    setSnapshot(values);

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (values, bag) => {
    let step = getStepContent(activeStep);
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    let isLastStep = activeStep === steps.length - 1;
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      handleNext(values);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.stepper}>
          <div><h2>MaterialUI Formik</h2></div>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>

        <Formik
          initialValues={snapshot}
          onSubmit={handleSubmit}
          validationSchema={getStepContent(activeStep).props.validationSchema}
        >
          {(formik) => (
            <Form>
              <div>
                {
                  <div>
                    <div className={classes.instructions}>
                    <Paper elevation={3} >
                      {getStepContent(activeStep)}
                      </Paper>
                    </div>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={() => handleBack(formik.values)}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={formik.isSubmitting}
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                }
              </div>
              <Debug />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
