"use client";
import type { FC } from "react";
import React, { useRef } from "react";

import type { ExpenseType } from "@/types";
import { useAccountBalance } from "@/utils";
import { numberWithCommas } from "@/utils/helpers";

import AccountTop from "../common/AccoutTop";
import PrintButton from "../common/Print";

interface Props {
  details: string;
  dr?: number;
  cr?: number;
}

const Balance: FC<Props> = ({ cr, dr, details }) => {
  return (
    <tr>
      <td>{details}</td>
      <td className="center">{dr ? numberWithCommas(dr) : "-"}</td>
      <td className="center">{cr ? numberWithCommas(cr) : "-"}</td>
    </tr>
  );
};

const IncomeStatement = (): React.ReactNode => {
  const componentRef = useRef(null);
  const { salesBal, netPurchase, profit, grossProfit } = useAccountBalance();
  const expenses: ExpenseType[] = [];
  console.log("Gross profit", grossProfit);
  return (
    <>
      <div className="card-panel" ref={componentRef}>
        <AccountTop account="Profit & loss account" />
        <table className="black-text striped">
          <thead>
            <tr>
              <th>Item</th>
              <th className="center">Amount (USD)</th>
              <th className="center">Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            <Balance details="Sales" cr={salesBal} />
            <Balance details="Net purchases" dr={netPurchase} />
            <Balance details="GROSS PROFIT" cr={grossProfit} />

            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {salesBal > 0 && (
              <>
                <tr>
                  <td>EXPENSES:</td>
                  <td></td>
                  <td></td>
                </tr>
                {expenses.map((e) => (
                  <Balance key={e.id} details={e.details} dr={e.amount} />
                ))}
              </>
            )}
            {salesBal > 0 && (
              <tr>
                <td>
                  <b>
                    {profit > 0 && "NET PROFIT"}
                    {profit < 0 && "NET LOSS"}
                  </b>
                </td>
                <td></td>

                <td className="center underline">
                  <b>
                    {profit > 0 && numberWithCommas(profit)}
                    {profit === 0 && numberWithCommas(profit)}
                    {profit < 0 &&
                      "(" + numberWithCommas(Math.abs(profit)) + ")"}
                  </b>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PrintButton componentRef={componentRef} />
    </>
  );
};

export default IncomeStatement;
