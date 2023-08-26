import React from "react";

import Expense from "@/components/routes/Expense";
import type { ExpenseType } from "@/types";

const Page = (): React.ReactNode => {
  const data: ExpenseType[] = [];
  return <Expense expenses={data} />;
};

export default Page;
