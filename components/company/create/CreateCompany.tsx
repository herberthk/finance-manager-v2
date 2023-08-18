"use client";
import { type Session } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import type { FC } from "react";
import React from "react";

// import Companies from './Companies';
import Fab from "@/components/common/Fab";
// import Name from "@/components/steps/SetName";
import MainStep from "@/components/wizard/MainStep";
import Name from "@/components/wizard/SetName";
import add from "@/public/assets/add_document.svg";
import type { Company, User } from "@/types";
import { routeVariants } from "@/utils/variables";

import Companies from "../list/Companies";

interface Props {
  user: User | null;
  session: Session;
  companies: Company[];
}

const ListAndCreateCompany: FC<Props> = ({ user, session, companies }) => {
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
            {companies.length > 0 ? (
              <>
                <br />
                <br />
                <br />
                <Companies companies={companies || []} />
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
