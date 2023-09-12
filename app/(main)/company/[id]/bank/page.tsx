import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

import BankAccount from "@/components/routes/Bank";
import type { Database } from "@/types";

const Page = async (): Promise<React.JSX.Element> => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.from("bank").select("*");

  return <BankAccount bank={data ?? []} />;
};

export default Page;
