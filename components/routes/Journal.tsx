"use client";
import type { FC } from "react";
import React, { useRef } from "react";

import type { JournalType } from "@/types";

import AccountTop from "../common/AccoutTop";
import Credit from "../common/Credit";
import Debit from "../common/Debit";
import PrintButton from "../common/Print";
type Props = {
  journal: JournalType[];
};
const Journal: FC<Props> = ({ journal }) => {
  // let totalCredit = 0;
  // let totalDebit = 0;
  const componentRef = useRef(null);
  return (
    <>
      {/* <Ovary showOvary={showOvary} /> */}
      <div className="card-panel" ref={componentRef}>
        <AccountTop account="General Journal" />
        <table className="black-text striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Details</th>
              <th>Ref</th>
              <th className="center">Debit (USD)</th>
              <th className="center">Credit (USD)</th>
            </tr>
          </thead>
          <tbody>
            {journal.map((t) =>
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

            {/* <tr>
              <td>
                <b>TOTAL</b>
              </td>
              <td></td>
              <td></td>
              <td className="center underline">
                <b>{numberWithCommas(totalDebit)}</b>
              </td>
              <td className="center underline">
                <b>{numberWithCommas(totalCredit)}</b>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <PrintButton componentRef={componentRef} />
    </>
  );
};

export default Journal;
