// export const dynamic = "force-dynamic";

// import dynamic from "next/dynamic";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Register from "@/components/welcome/Register";
import type { Database } from "@/types/database.types";
// const Register = dynamic(() => import("@/components/welcome/Register"), {
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

  if (session && session.user) {
    // console.log("Session", session);
    redirect("/companies");
  }
  return <Register />;
};

export default Page;
