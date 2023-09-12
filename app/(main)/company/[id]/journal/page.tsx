import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

import Journal from "@/components/routes/Journal";
import type { Database } from "@/types";

const Page = async (): Promise<React.JSX.Element> => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.from("journal").select("*");
  return <Journal journal={data ?? []} />;
};

export default Page;
