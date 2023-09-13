import M from "materialize-css";
import React, { useEffect } from "react";

import { useCreateCompanyStore } from "@/store";

const BasicInfo = (): React.ReactNode => {
  useEffect(() => {
    M.updateTextFields();
  }, []);
  const nextStep = useCreateCompanyStore((state) => state.nextStep);
  const prevStep = useCreateCompanyStore((state) => state.prevStep);
  const name = useCreateCompanyStore((state) => state.name);
  const desc = useCreateCompanyStore((state) => state.description);
  const account = useCreateCompanyStore((state) => state.accountNumber);
  const setAccount = useCreateCompanyStore((state) => state.setAccount);
  const setDesc = useCreateCompanyStore((state) => state.setDescription);
  const setName = useCreateCompanyStore((state) => state.setName);
  const wizardDirection = useCreateCompanyStore(
    (state) => state.wizardDirection,
  );
  const setWizardDirection = useCreateCompanyStore(
    (state) => state.setWizardDirection,
  );
  const setCompletedStep = useCreateCompanyStore(
    (state) => state.setCompletedStep,
  );
  const currentStep = useCreateCompanyStore((state) => state.step);
  const next = () => {
    if (!name || !desc) {
      M.toast({
        html: "Company name and description are required",
        classes: "rounded red",
      });
      return;
    }
    if (wizardDirection !== "next") {
      setWizardDirection("next");
    }
    setCompletedStep(currentStep - 1);
    nextStep();
  };
  return (
    <>
      <div className="center">
        {/* <h5>ABOUT </h5> */}

        <div className="row">
          <div className="input-field col s12">
            <i className="fas fa-address-card prefix "></i>
            <i className="material-icons prefix">account_circle</i>
            <input
              id="company_name"
              value={name || ""}
              // autoFocus={true}
              type="text"
              className="input_border"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="teal-text" htmlFor="company_name">
              Your company name
            </label>
          </div>
          <div className="input-field col s12 ">
            <i className="material-icons prefix">info_outline</i>
            <input
              id="desc"
              type="text"
              value={desc || ""}
              className="input_border"
              onChange={(e) => setDesc(e.target.value)}
            />
            <label className="teal-text" htmlFor="desc">
              Short description of your company
            </label>
          </div>

          <div className="input-field col s12 ">
            <i className="material-icons prefix">account_balance</i>
            <input
              id="account"
              type="text"
              value={account || ""}
              className="input_border"
              onChange={(e) => setAccount(e.target.value)}
            />
            <label className="teal-text" htmlFor="account">
              Bank account number of your company (optional)
            </label>
          </div>
        </div>
      </div>
      <button onClick={prevStep} className="btn white black-text shadow">
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

export default BasicInfo;
