"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import M from "materialize-css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

import type { Database } from "@/types/database.types";
import { transition } from "@/utils/variables";

import { FildSpan, FormBottom, FormHeader, FormTop, FormWraper } from "./comps";
// import { useGoogleLogin } from 'react-google-login';
import Header from "./Header";
import { Locker } from "./Locker";
import Ovary from "./Ovary";

export const LinkStyles = {
  links: {
    color: "orange",
    fontWeight: 700,
    margin: "1rem",
  },
  p: {
    fontSize: "1.4rem",
  },
};

const Register = (): React.ReactNode => {
  // const router = useRouter();
  // const dispatch = useThunkDispatch();
  useLayoutEffect(() => {
    M.AutoInit();
    document.body.classList.add("login_bg");
    return () => {
      // Called just before the component unmount
      document.body.classList.remove("login_bg");
    };
  }, []);
  const [email, setLoginEmail] = useState("");
  const [password, setloginPass] = useState("");
  const [name, setName] = useState("");
  const [showOvary, setShowOvary] = useState(false);
  const [lockShow, setLockShow] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  // const [unlocker, setUnlocker] = useState(false);
  const manageLocker = () => {
    setLockShow(true);
    setTimeout(() => setLockShow(false), 4000);
  };

  const openOvary = () => {
    setShowOvary(true);
  };
  const closeOvary = () => {
    setShowOvary(false);
  };

  const submit = async () => {
    if (!email || !password) {
      M.toast({ html: "All fields are required", classes: "rounded red" });
      manageLocker();
      return;
    }
    openOvary();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      closeOvary();

      if (error) {
        console.log("error", error.message);
        M.toast({ html: error.message, classes: "rounded red" });
        manageLocker();
      } else {
        router.refresh();
        console.log("data", data);

        M.toast({ html: "Success", classes: "rounded green" });
        M.toast({ html: "Account created", classes: "rounded green" });
      }
    } catch (error) {
      closeOvary();
      M.toast({ html: "Network error", classes: "rounded red" });
    }
  };
  // const { loggedIn, pending } = useTypedSelector((state) => state.auth);
  // if (loggedIn) {
  //   router.push("/companies");
  //   return;
  //   // return <Redirect to="/companies" />;
  // }
  // if (pending) {
  //   router.push("/security");
  //   return;
  //   // return <Redirect to="/security" />;
  // }
  return (
    <motion.div

    // initial="exit"
    // animate="enter"
    // exit="exit"
    // variants={routeVariants}
    >
      <Header isHome={false} />
      <Ovary showOvary={showOvary} />
      <FormWraper
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 0.1, transition } }}>
        <Locker lockShow={lockShow} />

        <FormHeader>Create account</FormHeader>
        <FormTop>
          <div className="input-field col s12 field">
            <i className="tiny material-icons white-text prefix">lock</i>
            <input
              id="name"
              type="text"
              className="white-text input_border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FildSpan />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field col s12 field">
            <i className="material-icons tiny white-text prefix">email</i>
            <input
              id="em"
              type="email"
              value={email}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="validate white-text input_border"
            />
            <FildSpan />
            <label htmlFor="em">Email</label>
          </div>
          <div className="input-field col s12 field">
            <i className="tiny material-icons white-text prefix">lock</i>
            <input
              id="pas"
              type="password"
              className="white-text input_border"
              value={password}
              onChange={(e) => setloginPass(e.target.value)}
            />
            <FildSpan />
            <label htmlFor="pas">Password</label>
          </div>
        </FormTop>
        <FormBottom>
          <button className="waves-effect waves-light" onClick={submit}>
            Register
          </button>
          <p style={LinkStyles.p}>
            Do you have an account?
            <Link style={LinkStyles.links} href="/login">
              Login
            </Link>
          </p>
        </FormBottom>
      </FormWraper>
    </motion.div>
  );
};

export default Register;
