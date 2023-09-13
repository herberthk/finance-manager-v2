"use client";
import React from "react";
import { Dna } from "react-loader-spinner";

const Loader = (): React.ReactNode => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3 w-full h-[600px]">
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="Loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      <p className="text-2xl text-zinc-600">Please wait</p>
    </div>
  );
};

export default Loader;
