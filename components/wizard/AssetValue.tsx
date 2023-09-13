import M from "materialize-css";
import React, { useEffect } from "react";

import { useCreateCompanyStore } from "@/store";
import { validateNumber } from "@/utils";

const AssetValue = (): React.ReactNode => {
  useEffect(() => {
    M.updateTextFields();
  }, []);

  const nextStep = useCreateCompanyStore((state) => state.nextStep);
  const prevStep = useCreateCompanyStore((state) => state.prevStep);
  const setLandValue = useCreateCompanyStore((state) => state.setLandValue);
  const setMachineValue = useCreateCompanyStore(
    (state) => state.setMachineValue,
  );
  const setVehicleValue = useCreateCompanyStore(
    (state) => state.setVehicleValue,
  );
  const assets = useCreateCompanyStore((state) => state.assets);
  const landValue = useCreateCompanyStore((state) => state.landValue);
  const machineValue = useCreateCompanyStore((state) => state.machineValue);
  const vehicleValue = useCreateCompanyStore((state) => state.vehicleValue);
  const assetSkipped = useCreateCompanyStore((state) => state.assetSkipped);
  const wizardDirection = useCreateCompanyStore(
    (state) => state.wizardDirection,
  );
  const setCompletedStep = useCreateCompanyStore(
    (state) => state.setCompletedStep,
  );
  const currentStep = useCreateCompanyStore((state) => state.step);
  const setWizardDirection = useCreateCompanyStore(
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
                value={landValue || ""}
                onChange={(e) => setLandValue(validateNumber(+e.target.value))}
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
                value={machineValue || ""}
                onChange={(e) =>
                  setMachineValue(validateNumber(+e.target.value))
                }
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
                value={vehicleValue || ""}
                onChange={(e) =>
                  setVehicleValue(validateNumber(+e.target.value))
                }
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
