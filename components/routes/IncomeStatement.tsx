import type { FC } from "react";
import React, { useRef } from "react";

import { useTypedSelector } from "@/redux/stateTypes";
import type { CompanyProps } from "@/types";
import { numberWithCommas } from "@/utils/helpers";
import { useAccountBalance } from "@/utils/hooks";

import AccountTop from "../common/AccoutTop";
import PrintButton from "../common/Print";

interface Props {
  details: string;
  dr?: number;
  cr?: number;
}

const Bal: FC<Props> = ({ cr, dr, details }) => {
  return (
    <tr>
      <td>{details}</td>
      <td className="center">{dr ? numberWithCommas(dr) : "-"}</td>
      <td className="center">{cr ? numberWithCommas(cr) : "-"}</td>
    </tr>
  );
};

const IncomeStatement: FC<CompanyProps> = ({ email, location, name }) => {
  const componentRef = useRef(null);
  const { salesBal, netPurchase, profit, grossProfit } = useAccountBalance();
  const { expenses } = useTypedSelector((state) => state.expenses);
  console.log("Gross profit", grossProfit);
  return (
    <>
      <div className="card-panel" ref={componentRef}>
        <AccountTop
          account="Profit & loss account"
          name={name}
          email={email}
          location={location}
        />
        <table className="black-text striped">
          <thead>
            <tr>
              <th>Item</th>
              <th className="center">Amount (USD)</th>
              <th className="center">Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            <Bal details="Sales" cr={salesBal} />
            <Bal details="Net purchases" dr={netPurchase} />
            <Bal details="GROSS PROFIT" cr={grossProfit} />

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
                  <Bal key={e.id} details={e.details} dr={e.amount} />
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
