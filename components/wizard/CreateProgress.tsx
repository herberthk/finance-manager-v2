import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import * as React from "react";

import { useCreateCompanyStore } from "@/zustand";

const steps = [
  "Basic information",
  "Contact information",
  "Opening balances",
  "Company assets",
  "Asset value",
  "Social links",
  "Review and submit",
];

const HorizontalStepper = (): React.ReactNode => {
  const activeStep = useCreateCompanyStore((state) => state.step);
  const completedSteps = useCreateCompanyStore((state) => state.completedSteps);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep - 1} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completedSteps[index]}>
            <StepButton
              sx={{
                "&:focus": {
                  backgroundColor: "transparent",
                },
              }}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default HorizontalStepper;
