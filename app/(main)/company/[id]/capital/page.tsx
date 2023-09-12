import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

import CapitalAccount from "@/components/routes/Capital";
import type { Database } from "@/types";

const Page = async (): Promise<React.JSX.Element> => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.from("capital").select("*");
  return <CapitalAccount capital={data ?? []} />;
};

export default Page;
