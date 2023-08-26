import dayjs from "dayjs";
import type { FC } from "react";
import React, { useRef } from "react";

import type { CashbooKType } from "@/types";
import { numberWithCommas } from "@/utils/helpers";

import AccountTop from "../common/AccoutTop";
import { TableHead } from "../common/comps";
import PrintButton from "../common/Print";

// TODO
// Make Credit and debit to be reusable like other accounts

const Debit: FC<Partial<CashbooKType>> = ({
  cash,
  bank,
  details,
  createdat,
}) => {
  return (
    <tr>
      <td>{dayjs(createdat).format("DD/MM/YYYY")}</td>
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

const Credit: FC<Partial<CashbooKType>> = ({
  cash,
  bank,
  details,
  createdat,
}) => {
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{dayjs(createdat).format("DD/MM/YYYY")}</td>
      <td>{details}</td>
      <td className="center">{!cash ? "-" : numberWithCommas(cash)}</td>
      <td className="center">{!bank ? "-" : numberWithCommas(bank)}</td>
    </tr>
  );
};

type Props = {
  cashbook: CashbooKType[];
};

const Cashbook: FC<Props> = ({ cashbook }) => {
  const totalDrcash = cashbook
    .filter((c) => c.type === "dr")
    .map((c) => c.cash)
    .reduce((a, b) => a + b, 0);
  const totalDrbank = cashbook
    .filter((c) => c.type === "dr")
    .map((c) => c.bank)
    .reduce((a, b) => a + b, 0);

  const totalCrcash = cashbook
    .filter((c) => c.type === "cr")
    .map((c) => c.cash)
    .reduce((a, b) => a + b, 0);
  let totalCrbank = cashbook
    .filter((c) => c.type === "cr")
    .map((c) => c.bank)
    .reduce((a, b) => a + b, 0);
  const balCash = totalDrcash - totalCrcash;
  const balBank = totalDrbank - totalCrbank;
  const totalBankBal = balBank < 0 ? totalCrbank : balBank;
  const componentRef = useRef(null);
  return (
    <>
      <div className="card-panel" ref={componentRef}>
        <AccountTop account="Cash book" />
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
            {cashbook.map((t) =>
              t.type === "dr" ? (
                <Debit
                  key={t.id}
                  cash={t.cash}
                  bank={t.bank}
                  details={t.details}
                  createdat={t.createdat}
                  code={t.code}
                />
              ) : (
                <Credit
                  key={t.id}
                  cash={t.cash}
                  bank={t.bank}
                  details={t.details}
                  createdat={t.createdat}
                  code={t.code}
                />
              ),
            )}
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
