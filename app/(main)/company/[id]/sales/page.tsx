import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

import Sales from "@/components/routes/Sales";
import type { Database } from "@/types";

const Page = async (): Promise<React.JSX.Element> => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.from("sales").select("*");
  return <Sales sales={data ?? []} />;
};

export default Page;
