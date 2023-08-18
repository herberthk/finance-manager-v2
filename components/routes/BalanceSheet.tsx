import type { FC } from "react";
import React, { useRef } from "react";

import AccountTop from "@/components/common/AccoutTop";
import PrintButton from "@/components/common/Print";
import { numberWithCommas, useAccountBalance } from "@/utils";

type Bal = {
  amount: number;
  details: string;
};

const Balance: FC<Bal> = ({ amount, details }) => {
  return (
    <tr>
      <td>{details}</td>
      <td className="center"></td>
      <td className="center">
        {amount > 0 && numberWithCommas(amount)}
        {amount === 0 && numberWithCommas(amount)}
        {amount < 0 && "(" + numberWithCommas(Math.abs(amount)) + ")"}
      </td>
    </tr>
  );
};

const BalanceSheet = (): React.ReactNode => {
  const {
    landBal,
    bankBal,
    machineBal,
    vehicleBal,
    cashBal,
    totalCapital,
    balSheetCreditTotal,
    balSheetDebitTotal,
    stockValue,
    profit,
    fixedAssetAvailable,
  } = useAccountBalance();

  const componentRef = useRef(null);

  return (
    <>
      <div className="card-panel" ref={componentRef}>
        <AccountTop account="Balance sheet" />

        <table className="black-text striped">
          <thead>
            <tr>
              <th>Item</th>
              <th className="center">Amount (USD)</th>
              <th className="center">Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            {fixedAssetAvailable() && (
              <tr>
                <td>
                  <b>Fixed assets</b>
                </td>
                <td></td>
                <td></td>
              </tr>
            )}
            {landBal > 0 && <Balance amount={landBal} details="Land" />}
            {machineBal > 0 && (
              <Balance amount={machineBal} details="Machine" />
            )}
            {vehicleBal > 0 && (
              <Balance amount={vehicleBal} details="Vehicle" />
            )}

            <tr>
              <td>
                <b>Current assets</b>
              </td>
              <td></td>
              <td></td>
            </tr>
            {cashBal > 0 && <Balance amount={cashBal} details="Cash" />}
            {bankBal > 0 && <Balance amount={bankBal} details="Bank" />}
            {stockValue > 0 && <Balance amount={stockValue} details="Stock" />}
            <tr>
              <td>
                <b>TOTAL ASSETS</b>
              </td>
              <td></td>
              <td className="center underline">
                <b>{numberWithCommas(balSheetDebitTotal)}</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Liabilities & Equity</b>
              </td>
              <td></td>
              <td></td>
            </tr>
            <Balance amount={totalCapital} details="Capital" />
            {profit > 0 && <Balance amount={profit} details="Profit" />}
            {profit < 0 && <Balance amount={profit} details="Loss" />}

            <tr>
              <td>
                <b>TOTAL LIABILITIES & EQUIT</b>
              </td>
              <td></td>
              <td className="center underline">
                <b>{numberWithCommas(balSheetCreditTotal)}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PrintButton componentRef={componentRef} />
    </>
  );
};

export default BalanceSheet;
