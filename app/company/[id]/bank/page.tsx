"use client";
import React from "react";

import BankAccount from "@/components/routes/Bank";
import type { BankType } from "@/types";

const Page = (): React.ReactNode => {
  const data: BankType[] = [];
  return <BankAccount bank={data} />;
};

export default Page;
