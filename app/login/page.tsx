// export const dynamic = "force-dynamic";

// import dynamic from "next/dynamic";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Login from "@/components/welcome/Login";
import type { Database } from "@/types/database.types";
// const Login = dynamic(() => import("@/components/welcome/Login"), {
//   ssr: false,
// });

// const createServerSupabaseClient = cache(() => {
//   const cookieStore = cookies();
//   return createServerComponentClient<Database>({ cookies: () => cookieStore });
// });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/companies");
  }
  // console.log("Session", session);
  return <Login />;
};

export default Page;
