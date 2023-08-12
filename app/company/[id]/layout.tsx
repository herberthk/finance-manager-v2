"use client";
import axios from "axios";
import M from "materialize-css";
import { useParams, useRouter } from "next/navigation";
import type { FC } from "react";
import React, { useEffect, useLayoutEffect, useState } from "react";

import Fab from "@/components/common/Fab";
import MainHeader from "@/components/common/MainHeader";
import Side from "@/components/common/Side";
import Ovary from "@/components/welcome/Ovary";
import { useTypedSelector } from "@/redux/stateTypes";
import type { AxiosResponse, CompanyProps } from "@/types";
import { SERVER_URL } from "@/utils/constants";
import { useCustomDispatch } from "@/utils/hooks";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const { id } = useParams();
  const router = useRouter();
  useLayoutEffect(() => {
    // M.AutoInit();
    document.body.classList.add("main_wrapper");
    return () => {
      // Called just before the component unmount
      document.body.classList.remove("main_wrapper");
    };
  }, [id]);
  const {
    getBank,
    getCapital,
    getCash,
    getJournal,
    getLand,
    getMachine,
    getVehicle,
    getStock,
    getCashBook,
    getSales,
    getExpenses,
  } = useCustomDispatch();
  const [showOvary, setShowOvary] = useState(false);
  const { loggedIn, token } = useTypedSelector((state) => state.auth);
  axios.defaults.headers.common["Authorization"] = token;
  const { companies } = useTypedSelector((state) => state.companies);
  const company = companies.filter((m) => m._id === id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [props] = company !== undefined && (company as any);
  const openOvary = () => {
    setShowOvary(true);
  };
  const closeOvary = () => {
    setShowOvary(false);
  };
  useEffect(() => {
    (async () => {
      // alert('yess');
      const id = compId;
      if (!id) {
        return;
      }
      openOvary();
      // console.log('companyId', compId);
      try {
        const res = await axios.get(
          `${SERVER_URL}/transaction/getInitialData/${id}`,
        );
        // console.log('response', res.data);
        closeOvary();
        const { success, error } = res.data as AxiosResponse;
        if (!success) {
          M.toast({ html: error, classes: "rounded red" });
          // setInvalid(true);
        } else {
          // if (res.data.data.length) {
          // console.log('my data', res.data.data);
          await getBank(res.data.data.bank);

          await getCapital(res.data.data.capital);
          await getCash(res.data.data.cash);
          await getJournal(res.data.data.journal);
          await getLand(res.data.data.land);
          await getMachine(res.data.data.machine);
          await getVehicle(res.data.data.vehicle);
          await getStock(res.data.data.stock);
          await getCashBook(res.data.data.cashbook);
          await getSales(res.data.data.sales);
          await getExpenses(res.data.data.expenses);
          // }

          // M.toast({ html: info, classes: 'rounded green' });
        }
      } catch (error) {
        closeOvary();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  let companyName: string = "";
  let compId: string = "";
  if (props) {
    const { name, _id } = props && (props as CompanyProps);
    companyName = name;
    compId = _id;
  }

  if (!loggedIn) {
    router.push("/login");
    // return <Redirect to="/login" />;
    return;
  }
  return (
    <>
      <Ovary showOvary={showOvary} />
      <MainHeader name={companyName} />
      <div className="row">
        <Side id={compId} />
        <div className="container">
          <div className="col s12 m9 main_margin">{children}</div>
        </div>
      </div>
      <Fab />
    </>
  );
};

export default Layout;
