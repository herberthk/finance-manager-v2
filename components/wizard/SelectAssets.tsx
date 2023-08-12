import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import React from "react";

import type { AssetType } from "@/types";
import { useCompanyStore } from "@/zustand/store";

const SelectAssets = (): React.ReactNode => {
  const nextStep = useCompanyStore((state) => state.nextStep);
  const prevStep = useCompanyStore((state) => state.prevStep);
  const removeAsset = useCompanyStore((state) => state.removeAsset);
  const addAsset = useCompanyStore((state) => state.addAsset);
  const assets = useCompanyStore((state) => state.assets);
  const skipAssetStep = useCompanyStore((state) => state.skipAssetStep);
  const wizardDirection = useCompanyStore((state) => state.wizardDirection);
  const setCompletedStep = useCompanyStore((state) => state.setCompletedStep);
  const currentStep = useCompanyStore((state) => state.step);
  const setWizardDirection = useCompanyStore(
    (state) => state.setWizardDirection,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: AssetType,
  ) => (e.target.checked ? addAsset(type) : removeAsset(type));

  const next = () => {
    if (wizardDirection !== "next") {
      setWizardDirection("next");
    }
    if (!assets.length) {
      skipAssetStep(true);
      nextStep();
      return;
    }

    skipAssetStep(false);
    setCompletedStep(currentStep - 1);
    nextStep();
  };

  const back = () => {
    if (wizardDirection !== "previous") {
      setWizardDirection("previous");
    }
    prevStep();
  };
  return (
    <>
      <div className="center">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={assets.includes("land")}
                onChange={(e) => handleChange(e, "land")}
              />
            }
            label="Land"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={assets.includes("machine")}
                onChange={(e) => handleChange(e, "machine")}
              />
            }
            label="Machine"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={assets.includes("vehicle")}
                onChange={(e) => handleChange(e, "vehicle")}
              />
            }
            label="Vehicle"
          />
        </FormGroup>
      </div>

      <button onClick={back} className="btn white black-text shadow">
        <b>Back</b>
        <i className="material-icons left">navigate_before</i>
      </button>
      <button onClick={next} className="btn white black-text shadow right">
        <b>next</b>
        <i className="material-icons right">navigate_next</i>
      </button>
    </>
  );
};

export default SelectAssets;
