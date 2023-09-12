// export const dynamic = "force-dynamic";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import ListAndCreateCompany from "@/components/company/create/CreateCompany";
import type { Database } from "@/types";

const Page = async (): Promise<React.JSX.Element> => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: user } = await supabase.from("users").select("*").single();
  const { data: companies } = await supabase.from("company").select("*");
  // console.log("Session", session);
  // error?.message ==='JSON object requested, multiple (or no) rows returned' means nothing was returned
  // console.log("user", user);
  // console.log("companies", companies);
  return (
    <ListAndCreateCompany
      companies={companies || []}
      user={user}
      session={session}
    />
  );
};

export default Page;
