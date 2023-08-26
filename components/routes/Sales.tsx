import type { FC } from "react";
import React, { useRef } from "react";

import type { SalesType } from "@/types";
import { getTotalCredit, getTotalDebit, numberWithCommas } from "@/utils";

import AccountTop from "../common/AccoutTop";
import { TableHead } from "../common/comps";
import Credit from "../common/Credit";
import Debit from "../common/Debit";
import PrintButton from "../common/Print";

type Props = {
  sales: SalesType[];
};
const Sales: FC<Props> = ({ sales }) => {
  const totalDebit = getTotalDebit(sales);
  const totalCredit = getTotalCredit(sales);
  const componentRef = useRef(null);
  return (
    <>
      <div className="card-panel" ref={componentRef}>
        <AccountTop account="Sales Account" />
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
            {sales.map((t) =>
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
              <td className="center"></td>
              <td></td>
              <td></td>
              <td className="center">
                {numberWithCommas(totalCredit - totalDebit)}
              </td>
            </tr>
            <tr>
              <td>TOTAL</td>
              <td> </td>
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

export default Sales;
