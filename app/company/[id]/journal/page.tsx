import React from "react";

import Journal from "@/components/routes/Journal";
import type { JournalType } from "@/types";

const Page = (): React.ReactNode => {
  const data: JournalType[] = [];
  return <Journal journal={data} />;
};

export default Page;
