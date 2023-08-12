"use client";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import type { FC } from "react";
import React, { useEffect } from "react";

// import Companies from './Companies';
import Fab from "@/components/common/Fab";
// import Name from "@/components/steps/SetName";
import MainStep from "@/components/wizard/MainStep";
import Name from "@/components/wizard/SetName";
import add from "@/public/assets/add_document.svg";
import type { Database } from "@/types/database.types";
import { routeVariants } from "@/utils/variables";

import Companies from "../list/Companies";

type User = Database["public"]["Tables"]["users"]["Row"];

interface Props {
  user: User | null;
  session: Session;
}
const ListAndCreateCompany: FC<Props> = ({ user, session }) => {
  // const [userAvailable, setUserAvailable] = useState(false);
  // const supabase = createClientComponentClient<Database>();

  const available = false;
  useEffect(() => {
    // (async () => {
    //   let { data: user_id, error } = await supabase
    //     .from("users")
    //     .select("user_id")
    //     .single();
    //   console.log("user_id", user_id);
    //   console.log("error", error);
    // })();
    // return () => {
    //   cleanup
    // }
  }, []);
  console.log("user", user);
  // console.log("Session", session);
  return (
    <>
      <motion.div
        className="container"
        initial="exit"
        animate="enter"
        exit="exit"
        variants={routeVariants}>
        {/* <div className="row">{available ? <Companies /> : <Create />}</div> */}
        <div className="row">
          <div className="col s12 m5 main_margin">
            {available ? (
              <>
                <br />
                <br />
                <br />
                <Companies />
              </>
            ) : (
              <>
                <br />
                <br />
                <Image
                  src={add}
                  // width="100%"
                  alt="Create company"
                />
              </>
            )}
          </div>
          <div className="col s12 m7 ">
            {!user ? <Name session={session} /> : <MainStep user={user} />}
          </div>
        </div>
      </motion.div>
      <Fab />
    </>
  );
};

export default ListAndCreateCompany;
