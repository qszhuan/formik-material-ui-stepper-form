import React, { useState } from "react";

import HorizontalLinearStepper from "./Components/Stepper";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



const App = () => (
  <div>
    <h1>Formik Multistep Wizard</h1>
    {/* <Wizard
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
      }}
      onSubmit={async (values) =>
        sleep(300).then(() => console.log("Wizard submit", values))
      }
    >
    </Wizard> */}

    <HorizontalLinearStepper
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
      }}
      onSubmit={async (values) =>
        sleep(300).then(() => console.log("Wizard submit", values))
      }
    >
    </HorizontalLinearStepper>
  </div>
);

export default App;
