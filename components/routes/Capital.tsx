"use client";
import type { FC } from "react";
import React, { useRef } from "react";

import type { CapitalType } from "@/types";
import { getTotalCredit, numberWithCommas } from "@/utils";

import AccountTop from "../common/AccoutTop";
import { TableHead } from "../common/comps";
import Credit from "../common/Credit";
import PrintButton from "../common/Print";

type Props = {
  capital: CapitalType[];
};

const CapitalAccount: FC<Props> = ({ capital }) => {
  const totalCredit = getTotalCredit(capital);
  const componentRef = useRef(null);
  return (
    <>
      {/* <Ovary showOvary={showOvary} /> */}
      <div className="card-panel" ref={componentRef}>
        <AccountTop account="Capital Account" />
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
            {capital.map((t) => (
              <Credit
                key={t.id}
                amount={t.amount}
                details={t.details}
                createdat={t.createdat}
                code={t.code}
              />
            ))}
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

export default CapitalAccount;
