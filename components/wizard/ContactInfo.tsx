import M from "materialize-css";
import React, { useEffect } from "react";

import { useCreateCompanyStore } from "@/zustand";

const ContactInfo = (): React.ReactNode => {
  useEffect(() => {
    M.updateTextFields();
  }, []);
  const nextStep = useCreateCompanyStore((state) => state.nextStep);
  const prevStep = useCreateCompanyStore((state) => state.prevStep);
  const email = useCreateCompanyStore((state) => state.email);
  const location = useCreateCompanyStore((state) => state.location);
  const setEmail = useCreateCompanyStore((state) => state.setEmail);
  const setLocation = useCreateCompanyStore((state) => state.setLocation);
  const setTel = useCreateCompanyStore((state) => state.setTelephone);
  const tel = useCreateCompanyStore((state) => state.telephone);
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
    if (!email) {
      M.toast({
        html: "Company email is required",
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
  const back = () => {
    if (wizardDirection !== "previous") {
      setWizardDirection("previous");
    }
    prevStep();
  };
  return (
    <>
      <div className="center">
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">phone</i>
            <input
              id="number"
              type="tel"
              // autoFocus={true}
              value={tel || ""}
              onChange={(e) => setTel(e.target.value)}
              className="input_border"
            />
            <label className="teal-text" htmlFor="number">
              Company telephone number
            </label>
          </div>
          <div className="input-field col s12 ">
            <i className="material-icons prefix">email</i>
            <input
              id="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="input_border"
            />
            <label className="teal-text" htmlFor="email">
              Company email
            </label>
          </div>
          <div className="input-field col s12 ">
            <i className="material-icons prefix">location_on</i>
            <input
              id="location"
              type="text"
              value={location || ""}
              onChange={(e) => setLocation(e.target.value)}
              className="input_border"
            />
            <label className="teal-text" htmlFor="location">
              Location of your company
            </label>
          </div>
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

export default ContactInfo;
