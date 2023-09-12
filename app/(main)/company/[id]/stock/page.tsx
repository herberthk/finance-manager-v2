import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

import Stock from "@/components/routes/Stock";
import type { Database } from "@/types";

const Page = async (): Promise<React.JSX.Element> => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.from("stock").select("*");
  return <Stock stock={data ?? []} />;
};

export default Page;
