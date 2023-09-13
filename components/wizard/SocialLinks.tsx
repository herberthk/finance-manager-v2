import M from "materialize-css";
import React, { useEffect } from "react";

import { useCreateCompanyStore } from "@/store";

const Step5 = (): React.ReactNode => {
  useEffect(() => {
    M.updateTextFields();
  }, []);

  const nextStep = useCreateCompanyStore((state) => state.nextStep);
  const prevStep = useCreateCompanyStore((state) => state.prevStep);
  const fb = useCreateCompanyStore((state) => state.facebook);
  const setFb = useCreateCompanyStore((state) => state.setFacebook);
  const setTwt = useCreateCompanyStore((state) => state.setTwitter);
  const setYt = useCreateCompanyStore((state) => state.setYoutube);
  const twt = useCreateCompanyStore((state) => state.twitter);
  const yt = useCreateCompanyStore((state) => state.youtube);
  const setCompletedStep = useCreateCompanyStore(
    (state) => state.setCompletedStep,
  );
  const currentStep = useCreateCompanyStore((state) => state.step);
  const wizardDirection = useCreateCompanyStore(
    (state) => state.wizardDirection,
  );
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
        <div className="row">
          <div className="input-field col s12">
            <i className="fab fa-facebook prefix"></i>
            <input
              id="fb"
              value={fb || ""}
              // autoFocus={true}
              onChange={(e) => setFb(e.target.value)}
              type="text"
              className="input_border"
            />
            <label className="teal-text" htmlFor="fb">
              Company facebook account URL (optional)
            </label>
          </div>
          <div className="input-field col s12 ">
            <i className="fab fa-twitter prefix"></i>
            <input
              value={twt || ""}
              onChange={(e) => setTwt(e.target.value)}
              id="twt"
              type="text"
              className="input_border"
            />
            <label className="teal-text" htmlFor="twt">
              Company twitter account URL (optional)
            </label>
          </div>
          <div className="input-field col s12">
            <i className="fab fa-youtube prefix"></i>
            <input
              value={yt || ""}
              onChange={(e) => setYt(e.target.value)}
              id="yt"
              type="text"
              className="input_border"
            />
            <label className="teal-text" htmlFor="yt">
              Company youtube channel URL (optional)
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

export default Step5;
