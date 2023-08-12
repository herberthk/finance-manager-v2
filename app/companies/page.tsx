// export const dynamic = "force-dynamic";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { cache } from "react";

import ListAndCreateCompany from "@/components/company/create/CreateCompany";
import type { Database } from "@/types/database.types";

// export const dynamic = "force-dynamic"; //clodflare solution

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: user } = await supabase.from("users").select("*").single();
  // console.log("Session", session);
  // error?.message ==='JSON object requested, multiple (or no) rows returned' means nothing was returned
  // console.log("user", user);
  // console.log("error", error);
  return <ListAndCreateCompany user={user} session={session} />;
};

export default Page;
