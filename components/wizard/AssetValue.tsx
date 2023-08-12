import M from "materialize-css";
import React, { useEffect } from "react";

import { useCompanyStore } from "@/zustand/store";

const AssetValue = (): React.ReactNode => {
  useEffect(() => {
    M.updateTextFields();
  }, []);

  const nextStep = useCompanyStore((state) => state.nextStep);
  const prevStep = useCompanyStore((state) => state.prevStep);
  const setLandValue = useCompanyStore((state) => state.setLandValue);
  const setMachineValue = useCompanyStore((state) => state.setMachineValue);
  const setVehicleValue = useCompanyStore((state) => state.setVehicleValue);
  const assets = useCompanyStore((state) => state.assets);
  const landValue = useCompanyStore((state) => state.landValue);
  const machineValue = useCompanyStore((state) => state.machineValue);
  const vehicleValue = useCompanyStore((state) => state.vehicleValue);
  const assetSkipped = useCompanyStore((state) => state.assetSkipped);
  const wizardDirection = useCompanyStore((state) => state.wizardDirection);
  const setCompletedStep = useCompanyStore((state) => state.setCompletedStep);
  const currentStep = useCompanyStore((state) => state.step);
  const setWizardDirection = useCompanyStore(
    (state) => state.setWizardDirection,
  );

  useEffect(() => {
    (() => {
      if (assetSkipped) {
        wizardDirection === "next" ? nextStep() : prevStep();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = () => {
    // if (!cashBal && !bankBal) {
    //   M.toast({ html: "Enter bank or cash balance", classes: "rounded red" });
    //   return;
    // }
    if (wizardDirection !== "next") {
      setWizardDirection("next");
    }
    setCompletedStep(currentStep - 1);
    nextStep();
  };

  const back = () => {
    if (wizardDirection !== "previous") {
      setWizardDirection("previous");
    }
    prevStep();
  };
  //   console.log("vehicle value", vehicleValue);
  return (
    <>
      <div className="center">
        <div className="row">
          {assets.includes("land") && (
            <div className="input-field col s12">
              <i className="material-icons prefix">attach_money</i>
              <input
                value={landValue}
                onChange={(e) => setLandValue(e.target.value)}
                id="land"
                type="number"
                className="input_border"
                placeholder="0"
              />
              <label className="teal-text" htmlFor="land">
                Land value
              </label>
            </div>
          )}
          {assets.includes("machine") && (
            <div className="input-field col s12">
              <i className="material-icons prefix">attach_money</i>
              <input
                value={machineValue}
                onChange={(e) => setMachineValue(e.target.value)}
                id="machine"
                type="number"
                className="input_border"
                placeholder="0"
              />
              <label className="teal-text" htmlFor="machine">
                Machine value
              </label>
            </div>
          )}
          {assets.includes("vehicle") && (
            <div className="input-field col s12">
              <i className="material-icons prefix">attach_money</i>
              <input
                value={vehicleValue}
                onChange={(e) => setVehicleValue(e.target.value)}
                id="vehicle"
                type="number"
                className="input_border"
                placeholder="0"
              />
              <label className="teal-text" htmlFor="vehicle">
                Vehicle value
              </label>
            </div>
          )}
        </div>
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

export default AssetValue;
