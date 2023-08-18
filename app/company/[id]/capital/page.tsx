import React from "react";

import CapitalAccount from "@/components/routes/Capital";
import type { Capital } from "@/types";

const Page = (): React.ReactNode => {
  const data: Capital[] = [];
  return <CapitalAccount capital={data} />;
};

export default Page;
