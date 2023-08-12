"use client";
import { useParams } from "next/navigation";
import React from "react";

import Cashbook from "@/components/routes/Cashbook";
import { useTypedSelector } from "@/redux/stateTypes";

const Page = (): React.ReactNode => {
  const { id } = useParams();
  const { companies } = useTypedSelector((state) => state.companies);
  const company = companies.filter((m) => m._id === id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [props] = company !== undefined && (company as any);
  return <Cashbook {...props} />;
};

export default Page;
