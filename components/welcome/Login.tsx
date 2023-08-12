"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import M from "materialize-css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

import type { Database } from "@/types/database.types";
import { transition } from "@/utils/variables";

import {
  FildSpan,
  FormActions,
  FormBottom,
  FormHeader,
  FormTop,
  FormWraper,
} from "./comps";
import Header from "./Header";
import { Locker, Unlocker } from "./Locker";
import Ovary from "./Ovary";
import { LinkStyles } from "./Register";

const Login = (): React.ReactNode => {
  const router = useRouter();
  useLayoutEffect(() => {
    M.AutoInit();
    document.body.classList.add("login_bg");
    return () => {
      // Called just before the component unmount
      document.body.classList.remove("login_bg");
    };
  }, []);

  const [rememberMe, setRemember] = useState(true);
  const [email, setLoginEmail] = useState("");
  const [password, setloginPass] = useState("");
  const [showOvary, setShowOvary] = useState(false);
  const [lockShow, setLockShow] = useState(false);
  const [unlocker, setUnlocker] = useState(false);
  const manageLocker = () => {
    setLockShow(true);
    setTimeout(() => setLockShow(false), 2000);
  };
  const manageUnlocker = () => {
    setUnlocker(true);
    setTimeout(() => setUnlocker(false), 4000);
  };
  const openOvary = () => {
    setShowOvary(true);
  };
  const closeOvary = () => {
    setShowOvary(false);
  };
  const supabase = createClientComponentClient<Database>();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === "checkbox" && target.checked;
    setRemember(value);
  };

  const submit = async () => {
    if (!email || !password) {
      M.toast({ html: "All fields are required", classes: "rounded red" });
      manageLocker();
      return;
    }
    openOvary();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      closeOvary();
      if (error) {
        M.toast({ html: error.message, classes: "rounded red" });
        manageLocker();
      } else {
        if (data.user.confirmed_at) {
          // email is confirmed
          manageUnlocker();
          router.refresh();
          M.toast({ html: "Success", classes: "rounded green" });
        } else {
          // email is not confirmed
        }
      }
    } catch (error) {
      closeOvary();
    } finally {
      closeOvary();
    }
  };

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
        data-testid="login-page"
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 0.1, transition } }}>
        <Locker lockShow={lockShow} />
        <Unlocker unlocker={unlocker} />
        <FormHeader>Log In</FormHeader>
        <FormTop>
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
          <FormActions>
            <ul>
              <li>
                <p>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={handleInputChange}
                    className="filled-in"
                    id="filled-in-box"
                  />
                  <label htmlFor="filled-in-box">Remember me</label>
                </p>
              </li>
              {/* <li>
                <Link >Forgot password?</Link>
              </li> */}
            </ul>
            <div className="clear"> </div>
          </FormActions>
        </FormTop>
        <FormBottom>
          <button
            data-testid="login-button"
            className="waves-effect waves-light"
            onClick={submit}>
            log in
          </button>
          <p style={LinkStyles.p}>
            Don&apos;t have an account?
            <Link style={LinkStyles.links} href="/register">
              Register
            </Link>
          </p>
        </FormBottom>
      </FormWraper>
    </motion.div>
  );
};

export default Login;
