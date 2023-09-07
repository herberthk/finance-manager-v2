"use client";
import type { FC } from "react";
import React, { useRef } from "react";

import type { CashType } from "@/types";
import { getTotalCredit, getTotalDebit, numberWithCommas } from "@/utils";

import AccountTop from "../common/AccoutTop";
import { TableHead } from "../common/comps";
import Credit from "../common/Credit";
import Debit from "../common/Debit";
import PrintButton from "../common/Print";

type Props = {
  cash: CashType[];
};

const CashAccount: FC<Props> = ({ cash }) => {
  const totalDebit = getTotalDebit(cash);
  const totalCredit = getTotalCredit(cash);
  const componentRef = useRef(null);
  return (
    <>
      {/* <Ovary showOvary={showOvary} /> */}
      <div className="card-panel" ref={componentRef}>
        <AccountTop account="Cash Acount" />
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
            {cash.map((t) =>
              t.type === "dr" ? (
                <Debit
                  key={t.id}
                  amount={t.amount}
                  details={t.details}
                  createdat={t.createdat}
                  code={t.code}
                />
              ) : (
                <Credit
                  key={t.id}
                  amount={t.amount}
                  details={t.details}
                  createdat={t.createdat}
                  code={t.code}
                />
              ),
            )}
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

export default CashAccount;
