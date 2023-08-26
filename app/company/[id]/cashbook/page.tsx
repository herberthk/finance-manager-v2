import React from "react";

import Cashbook from "@/components/routes/Cashbook";
import type { CashbooKType } from "@/types";

const Page = (): React.ReactNode => {
  const data: CashbooKType[] = [];
  return <Cashbook cashbook={data} />;
};

export default Page;
