import type { Session } from "@supabase/auth-helpers-nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import M from "materialize-css";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import React, { useEffect, useState } from "react";

import type { Database } from "@/types";

interface Props {
  session: Session;
}

const Name: FC<Props> = ({ session }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    M.updateTextFields();
  }, []);

  const supabase = createClientComponentClient<Database>();
  const next = async () => {
    if (!name) {
      M.toast({
        html: "Full name is required",
        classes: "rounded red",
      });

      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("users")
      .insert([
        { user_id: session.user.id, name, admin: true, moderator: true },
      ]);
    setLoading(false);
    if (error) {
      M.toast({
        html: error.message,
        classes: "rounded red",
      });
      console.log(error);
    } else {
      M.toast({
        html: "Success name was created",
        classes: "rounded green",
      });
      router.refresh();
    }
  };
  return (
    <>
      <div className="center">
        {/* <h5>ABOUT </h5> */}
        <h4 className="">Hey we need to know your name</h4>

        <div className="row">
          <div className="input-field col s12">
            <i className="fas fa-address-card prefix "></i>
            {/* <i className='material-icons prefix'>account_circle</i> */}
            <input
              id="company_name"
              value={name}
              // autoFocus={true}
              type="text"
              className="input_border"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="teal-text" htmlFor="company_name">
              What is your full name (not the company name)
            </label>
          </div>
        </div>
      </div>

      <button onClick={next} className="btn white black-text shadow right">
        {loading ? (
          <b>Loading</b>
        ) : (
          <>
            <b>next</b>
            <i className="material-icons right">navigate_next</i>
          </>
        )}
      </button>
    </>
  );
};

export default Name;
