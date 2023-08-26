import type { FC } from "react";
import React, { useRef } from "react";

import AccountTop from "@/components/common/AccoutTop";
import { TableHead } from "@/components/common/comps";
import PrintButton from "@/components/common/Print";
import type { BankType } from "@/types";
import { getTotalCredit, getTotalDebit, numberWithCommas } from "@/utils";

import Credit from "../common/Credit";
import Debit from "../common/Debit";

type Props = {
  bank: BankType[];
};

const BankAccount: FC<Props> = ({ bank }) => {
  const totalDebit = getTotalDebit(bank);
  const totalCredit = getTotalCredit(bank);
  const componentRef = useRef(null);
  return (
    <>
      {/* <Ovary showOvary={showOvary} /> */}
      <div className="card-panel" ref={componentRef}>
        <AccountTop account="Bank Acount" />
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
            {bank.map((t) =>
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

export default BankAccount;
