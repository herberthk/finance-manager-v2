import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Home from "@/components/welcome/Home";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Page = async () => {
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
