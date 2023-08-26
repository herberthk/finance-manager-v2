import React from "react";

import CapitalAccount from "@/components/routes/Capital";
import type { CapitalType } from "@/types";

const Page = (): React.ReactNode => {
  const data: CapitalType[] = [];
  return <CapitalAccount capital={data} />;
};

export default Page;
