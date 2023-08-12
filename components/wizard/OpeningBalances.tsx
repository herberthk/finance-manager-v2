import M from "materialize-css";
import React, { useEffect } from "react";

import { useCompanyStore } from "@/zustand/store";

const OpeningBalances = (): React.ReactNode => {
  useEffect(() => {
    M.updateTextFields();
  }, []);

  const nextStep = useCompanyStore((state) => state.nextStep);
  const prevStep = useCompanyStore((state) => state.prevStep);
  const cashBal = useCompanyStore((state) => state.cashBalance);
  const bankBal = useCompanyStore((state) => state.bankBalance);
  const setCashBal = useCompanyStore((state) => state.setCashBalance);
  const setBankBal = useCompanyStore((state) => state.setBankBalance);
  const wizardDirection = useCompanyStore((state) => state.wizardDirection);
  const setCompletedStep = useCompanyStore((state) => state.setCompletedStep);
  const currentStep = useCompanyStore((state) => state.step);
  const setWizardDirection = useCompanyStore(
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
