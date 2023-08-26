"use client";
import React from "react";

import Sales from "@/components/routes/Sales";
import type { SalesType } from "@/types";

const Page = (): React.ReactNode => {
  const data: SalesType[] = [];
  return <Sales sales={data} />;
};

export default Page;
