"use client";

import axios from "axios";
import { motion } from "framer-motion";
import M from "materialize-css";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";

import { useThunkDispatch, useTypedSelector } from "@/redux/stateTypes";
import { transition } from "@/utils/variables";

import {
  Devider,
  DeviderLable,
  FildSpan,
  FormBottom,
  FormHeader,
  FormTop,
  FormWraper,
  Seperator,
} from "./comps";
import Header from "./Header";
import { Locker } from "./Locker";
import Ovary from "./Ovary";

const Confirm = (): React.ReactNode => {
  const router = useRouter();
  const { pending, email, token, loggedIn } = useTypedSelector(
    (state) => state.auth,
  );
  axios.defaults.headers.common["Authorization"] = token;
  const [showOvary, setShowOvary] = useState(false);
  const [code, setCode] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [lockShow, setLockShow] = useState(false);

  const dispatch = useThunkDispatch();
  const openOvary = () => {
    setShowOvary(true);
  };
  const closeOvary = () => {
    setShowOvary(false);
  };
  const manageLocker = () => {
    setLockShow(true);
    setTimeout(() => {
      setLockShow(false);
    }, 2000);
  };
  // const submit = async () => {
  //   if (!code) {
  //     M.toast({ html: "Activation code is required", classes: "rounded red" });
  //     manageLocker();
  //     return;
  //   }
  //   openOvary();

  //   try {
  //     const res = await axios.post(`${SERVER_URL}/code/verify`, {
  //       code,
  //       email,
  //     });

  //     closeOvary();
  //     const { success, error, info } = res.data as AxiosResponse;
  //     if (!success) {
  //       M.toast({ html: error, classes: "rounded red" });
  //       manageLocker();
  //     } else {
  //       dispatch({
  //         type: actionTypes.CONFIRM,
  //       });
  //       M.toast({ html: info, classes: "rounded green" });
  //       closeOvary();
  //     }
  //   } catch (error) {
  //     closeOvary();
  //   } finally {
  //     closeOvary();
  //   }
  // };

  useLayoutEffect(() => {
    M.AutoInit();
    document.body.classList.add("login_bg");
    return () => {
      // Called just before the component unmount
      document.body.classList.remove("login_bg");
    };
  }, []);

  // const sendCode = async () => {
  //   if (!email) {
  //     return;
  //   }
  //   // alert(email);
  //   openOvary();
  //   try {
  //     const res = await axios.post(`${SERVER_URL}/code/create`, {
  //       email,
  //     });

  //     closeOvary();
  //     const { success, error, info } = res.data as AxiosResponse;
  //     if (!success) {
  //       M.toast({ html: error, classes: "rounded red" });
  //       setInvalid(true);
  //     } else {
  //       M.toast({ html: info, classes: "rounded green" });
  //     }
  //   } catch (error) {
  //     closeOvary();
  //   }
  // };

  useEffect(() => {
    sendCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
    // initial={{ y: '100vh' }}
    // animate={{ y: 0 }}
    //   initial="exit"
    //   animate="enter"
    //   exit="exit"
    //   variants={routeVariants}
    >
      <Header isHome={false} />
      <Ovary showOvary={showOvary} />
      <FormWraper
        initial={{ y: "100vh" }}
        animate={{ y: 0, transition: { duration: 0.1, transition } }}>
        <Locker lockShow={lockShow} />
        <p className="security_top">
          We have sent security code to {email} so check your email and make
          sure the email provided is valid
        </p>
        <FormHeader>Enter Security code</FormHeader>
        <FormTop>
          <div className="input-field col s12 field">
            <i className="tiny material-icons white-text prefix">lock</i>
            <input
              id="code"
              type="text"
              className="white-text input_border"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <FildSpan />
            <label htmlFor="code">Enter security code</label>
          </div>
        </FormTop>
        <FormBottom>
          <button className="waves-effect waves-light" onClick={submit}>
            log in
          </button>
        </FormBottom>
        <Seperator>
          <Devider />
          <DeviderLable>OR</DeviderLable>
          <Devider />
        </Seperator>
        <motion.button
          onClick={sendCode}
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          className="btn google orange waves-effect waves-light btn-large">
          <b>Resend security code</b>
          <i className="material-icons right">autorenew</i>
        </motion.button>
      </FormWraper>
    </motion.div>
  );
};

export default Confirm;
