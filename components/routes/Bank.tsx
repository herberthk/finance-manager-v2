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

const Debit: FC<DataArray> = ({ amount, details, pd }) => {
  return (
    <tr>
      <td>{dayjs(pd).format("DD/MM/YYYY")}</td>
      <td>{details === "Bank" ? "Balance b/d" : details}</td>
      {/* <td>{code}</td> */}
      <td className="center">{numberWithCommas(amount)}</td>
      <td className="center"></td>
      <td className="center"></td>
      <td className="center"></td>
    </tr>
  );
};

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

const Bank: FC<CompanyProps> = ({ email, location, name }) => {
  const { bank } = useTypedSelector((state) => state.bank);

  let totalDebit = 0;
  let totalCredit = 0;
  const componentRef = useRef(null);
  return (
    <>
      {/* <Ovary showOvary={showOvary} /> */}
      <div className="card-panel" ref={componentRef}>
        <AccountTop
          account="Bank Acount"
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
            {bank.map((t) => {
              if (t.type === "dr") {
                totalDebit += t.amount;
              } else {
                totalCredit += t.amount;
              }

              return t.type === "dr" ? (
                <Debit
                  key={t._id}
                  amount={t.amount}
                  details={t.details}
                  pd={t.pd}
                  code={t.code}
                />
              ) : (
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
              <td>Balance c/d</td>
              <td> </td>
              <td className="center">
                {numberWithCommas(totalDebit - totalCredit)}
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>TOTAL</td>
              <td> </td>
              <td className="center underline">
                <b>{numberWithCommas(totalDebit)}</b>
              </td>
              <td></td>
              <td></td>
              <td className="center underline">
                <b>{numberWithCommas(totalDebit)}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PrintButton componentRef={componentRef} />
    </>
  );
};

export default Bank;
