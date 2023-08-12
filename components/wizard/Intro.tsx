import React from "react";

import { useCompanyStore } from "@/zustand/store";

const Intro = (): React.ReactNode => {
  const nextStep = useCompanyStore((state) => state.nextStep);
  return (
    <>
      <h1 className="center">CREAT NEW COMPANY </h1>
      <h5>We need to know more about the company you want to create.</h5>
      <p className="p">
        This wizard will help you to create your company by asking you few easy
        step by step questions.
      </p>
      <div className="center">
        <button onClick={nextStep} className="button white black-text hover_me">
          Start now
        </button>
      </div>
    </>
  );
};

export default Intro;
