import React from "react";

import PayExpense from "@/components/transaction/PayExpense";

const Page = (): React.ReactNode => {
  return <PayExpense bankBalance={0} cashBalance={0} />;
};

export default Page;
