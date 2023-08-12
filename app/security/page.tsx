// "use client";

// import dynamic from "next/dynamic";
import React from "react";

import Confirm from "@/components/welcome/Confirm";
// const Confirm = dynamic(() => import("@/components/welcome/Confirm"), {
//   ssr: false,
// });

const Page = (): React.ReactNode => {
  return <Confirm />;
};

export default Page;
