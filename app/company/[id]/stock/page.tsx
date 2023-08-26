import React from "react";

import Stock from "@/components/routes/Stock";
import type { StockType } from "@/types";

const Page = (): React.ReactNode => {
  const data: StockType[] = [];
  return <Stock stock={data} />;
};

export default Page;
