"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import M from "materialize-css";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

import { useCompanyStore } from "@/store";
import type { Database } from "@/types/database.types";

const Fab = (): React.ReactNode => {
  const router = useRouter();
  const resetCompany = useCompanyStore((state) => state.resetCompany);
  useLayoutEffect(() => {
    M.AutoInit();
  }, []);

  const supabase = createClientComponentClient<Database>();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    resetCompany();
    router.refresh();
  };
  return (
    <div className="fixed-action-btn">
      <button className="btn-floating btn-large red">
        <i className="large material-icons">apps</i>
      </button>
      <ul>
        <li>
          <button className="btn-floating red" onClick={handleSignOut}>
            <i className="material-icons">power_settings_new</i>
          </button>
        </li>
        <li>
          <button className="btn-floating yellow darken-1">
            <i className="material-icons">format_quote</i>
          </button>
        </li>
        <li>
          <button className="btn-floating green">
            <i className="material-icons">publish</i>
          </button>
        </li>
        <li>
          <button className="btn-floating blue">
            <i className="material-icons">attach_file</i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Fab;
