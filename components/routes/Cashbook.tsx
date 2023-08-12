import dayjs from "dayjs";
import type { FC } from "react";
import React, { useRef } from "react";

import type { CashBookDataArray } from "@/redux/interface";
import { useTypedSelector } from "@/redux/stateTypes";
import type { CompanyProps } from "@/types";
import { numberWithCommas } from "@/utils/helpers";

import AccountTop from "../common/AccoutTop";
import { TableHead } from "../common/comps";
import PrintButton from "../common/Print";

const Debit: FC<CashBookDataArray> = ({ cash, bank, details, pd }) => {
  return (
    <tr>
      <td>{dayjs(pd).format("DD/MM/YYYY")}</td>
      <td>{details}</td>
      <td className="center">{!cash ? "-" : numberWithCommas(cash)}</td>
      <td className="center">{!bank ? "-" : numberWithCommas(bank)}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );
};

const Credit: FC<CashBookDataArray> = ({ cash, bank, details, pd }) => {
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{dayjs(pd).format("DD/MM/YYYY")}</td>
      <td>{details}</td>
      <td className="center">{!cash ? "-" : numberWithCommas(cash)}</td>
      <td className="center">{!bank ? "-" : numberWithCommas(bank)}</td>
    </tr>
  );
};

const Cashbook: FC<CompanyProps> = ({ email, location, name }) => {
  const { cashbook } = useTypedSelector((state) => state.cashbook);
  let totalDrcash = 0;
  let totalDrbank = 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let totalCrcash = 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let totalCrbank = 0;
  let balCash = 0;
  let balBank = 0;
  let totalBankBal = 0;
  const componentRef = useRef(null);
  return (
    <>
      <div className="card-panel" ref={componentRef}>
        <AccountTop
          account="Cash book"
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
              <th className="center">Cash (USD)</th>
              <th className="center">Bank (USD)</th>
              <th>Date</th>
              <th>Details</th>
              <th className="center">Cash (USD)</th>
              <th className="center">Bank (USD)</th>
            </tr>
          </thead>
          <tbody>
            {cashbook.map((t) => {
              if (t.type === "dr") {
                totalDrcash += t.cash;
                totalDrbank += t.bank;
              } else {
                totalCrcash += t.cash;
                totalCrbank += t.bank;
              }

              return t.type === "dr" ? (
                <Debit
                  key={t._id}
                  cash={t.cash}
                  bank={t.bank}
                  details={t.details}
                  pd={t.pd}
                  code={t.code}
                />
              ) : (
                <Credit
                  key={t._id}
                  cash={t.cash}
                  bank={t.bank}
                  details={t.details}
                  pd={t.pd}
                  code={t.code}
                />
              );
            })}
            {/* {(balCash = totalDrcash - totalCrcash)}
            {(balBank = totalDrbank - totalCrbank)}
            {(totalBankBal = balBank < 0 ? totalCrbank : balBank)} */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Bal c/d</td>
              <td></td>
              <td className="center">
                {balCash === 0 ? "-" : numberWithCommas(balCash)}
              </td>
              <td className="center">
                {balBank === 0 && "-"}
                {balBank < 0 && "(" + numberWithCommas(totalBankBal) + ")"}
                {balBank > 0 && numberWithCommas(balBank)}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <b>TOTAL</b>
              </td>
              <td></td>
              <td className="center underline">
                {totalDrcash === 0 ? "-" : numberWithCommas(totalDrcash)}
              </td>
              <td className="center underline">
                {totalDrbank === 0 ? "-" : numberWithCommas(totalDrbank)}
              </td>
              <td></td>
              <td></td>
              <td className="center underline">
                {totalDrcash === 0 ? "-" : numberWithCommas(totalDrcash)}
              </td>
              <td className="center underline">
                {totalDrbank === 0 ? "-" : numberWithCommas(totalDrbank)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PrintButton componentRef={componentRef} />
    </>
  );
};

export default Cashbook;
