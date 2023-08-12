import dayjs from "dayjs";
import type { FC } from "react";
import React, { useRef } from "react";

import type { DataArray } from "@/redux/interface";
import { useTypedSelector } from "@/redux/stateTypes";
import type { CompanyProps } from "@/types";
import { numberWithCommas } from "@/utils/helpers";

import AccountTop from "../common/AccoutTop";
import { TableHead } from "../common/comps";
import PrintButton from "../common/Print";

// import { axiosResponse } from '../../welcome/interface';

const Credit: FC<DataArray> = ({ amount, details, pd }) => {
  return (
    <tr>
      <td className="center"></td>
      <td className="center"></td>
      <td className="center"></td>
      <td>{dayjs(pd).format("DD/MM/YYYY")}</td>
      <td>{details}</td>
      <td className="center">{numberWithCommas(amount)}</td>
      {/* <td>{code}</td> */}
    </tr>
  );
};

const Capital: FC<CompanyProps> = ({ email, location, name }) => {
  const { capital } = useTypedSelector((state) => state.capital);

  let totalCredit = 0;
  const componentRef = useRef(null);
  return (
    <>
      {/* <Ovary showOvary={showOvary} /> */}
      <div className="card-panel" ref={componentRef}>
        <AccountTop
          account="Capital Account"
          name={name}
          email={email}
          location={location}
        />
        <TableHead>
          <div>Dr</div>
          <div>Cr</div>
        </TableHead>
        <table className="black-text striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Details</th>
              <th className="center">Amount (USD)</th>
              <th>Date</th>
              <th>Details</th>
              <th className="center">Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            {capital.map((t) => {
              totalCredit += t.amount;
              return (
                <Credit
                  key={t._id}
                  amount={t.amount}
                  details={t.details}
                  pd={t.pd}
                  code={t.code}
                />
              );
            })}
            <tr>
              <td></td>
              <td> </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td> </td>
              <td></td>
              <td>Balance c/d</td>
              <td></td>
              <td className="center">{numberWithCommas(totalCredit)}</td>
            </tr>
            <tr>
              <td>TOTAL</td>
              <td></td>
              <td className="center underline">
                <b>{numberWithCommas(totalCredit)}</b>
              </td>
              <td></td>
              <td></td>
              <td className="center underline">
                <b>{numberWithCommas(totalCredit)}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PrintButton componentRef={componentRef} />
    </>
  );
};

export default Capital;
