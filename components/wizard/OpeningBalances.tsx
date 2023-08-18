import M from "materialize-css";
import React, { useEffect } from "react";

import { useCreateCompanyStore } from "@/zustand";

const OpeningBalances = (): React.ReactNode => {
  useEffect(() => {
    M.updateTextFields();
  }, []);

  const nextStep = useCreateCompanyStore((state) => state.nextStep);
  const prevStep = useCreateCompanyStore((state) => state.prevStep);
  const cashBal = useCreateCompanyStore((state) => state.cashBalance);
  const bankBal = useCreateCompanyStore((state) => state.bankBalance);
  const setCashBal = useCreateCompanyStore((state) => state.setCashBalance);
  const setBankBal = useCreateCompanyStore((state) => state.setBankBalance);
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
  return (
    <>
      <div className="center">
        <div className="input-field col s12 ">
          <i className="material-icons prefix">attach_money</i>
          <input
            value={cashBal}
            onChange={(e) => setCashBal(e.target.value)}
            id="twt"
            type="number"
            className="input_border"
            placeholder="0"
          />
          <label className="teal-text" htmlFor="twt">
            Opening cash balance
          </label>
        </div>
      </div>
      <div className="input-field col s12 ">
        <i className="material-icons prefix">attach_money</i>
        <input
          value={bankBal}
          onChange={(e) => setBankBal(e.target.value)}
          id="bl"
          type="number"
          className="input_border"
          placeholder="0"
        />
        <label className="teal-text" htmlFor="bl">
          Opening bank balance
        </label>
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

export default OpeningBalances;
