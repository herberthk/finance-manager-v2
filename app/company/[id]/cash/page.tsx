"use client";
import React from "react";

import CashAccount from "@/components/routes/Cash";
import type { CashType } from "@/types";

const Page = (): React.ReactNode => {
  const cash: CashType[] = [];
  return <CashAccount cash={cash} />;
};

export default Page;
