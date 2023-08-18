"use client";
import React from "react";

import BankAccount from "@/components/routes/Bank";
import type { Bank } from "@/types";

const Page = (): React.ReactNode => {
  const data: Bank[] = [];
  return <BankAccount bank={data} />;
};

export default Page;
