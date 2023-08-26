import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import Home from "@/components/welcome/Home";

const Page = async (): Promise<React.JSX.Element> => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // console.log("Session", session);
    redirect("/companies");
  }
  return <Home />;
};

export default Page;
