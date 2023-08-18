import type { FC } from "react";
import React, { useRef } from "react";

import type { DataArray } from "@/redux/interface";
import type { CompanyProps } from "@/types";
import { numberWithCommas } from "@/utils/helpers";
import { useAccountBalance } from "@/utils/hooks/hooks";

import AccountTop from "../common/AccoutTop";
import PrintButton from "../common/Print";
const Debit: FC<DataArray> = ({ amount, details }) => {
  return (
    <tr>
      <td>{details}</td>
      <td className="center">{numberWithCommas(amount)}</td>
      <td className="center"></td>
    </tr>
  );
};
const Credit: FC<DataArray> = ({ amount, details }) => {
  return (
    <tr>
      <td>{details}</td>
      <td></td>
      <td className="center">{numberWithCommas(amount)}</td>
    </tr>
  );
};

const TrialBalance: FC<CompanyProps> = ({ email, location, name }) => {
  const {
    landBal,
    bankBal,
    machineBal,
    vehicleBal,
    cashBal,
    totalCredit,
    totalDebit,
    totalCapital,
    purchases,
    salesBal,
    expenseBal,
  } = useAccountBalance();

  const componentRef = useRef(null);
  return (
    <>
      <div className="card-panel" ref={componentRef}>
        <AccountTop
          account="Trial Balance"
          name={name}
          email={email}
          location={location}
        />
        <table className="black-text striped">
          <thead>
            <tr>
              <th>Item</th>
              <th className="center">Debit (USD)</th>
              <th className="center">Credit (USD)</th>
            </tr>
          </thead>
          <tbody>
            <Credit amount={totalCapital} details="Capital" pd={new Date()} />
            {salesBal > 0 && (
              <Credit amount={salesBal} details="Sales" pd={new Date()} />
            )}
            {landBal > 0 && <Debit amount={landBal} details="Land" />}
            {vehicleBal > 0 && <Debit amount={vehicleBal} details="Vehicle" />}
            {purchases > 0 && <Debit amount={purchases} details="Purchase" />}
            {machineBal > 0 && <Debit amount={machineBal} details="Machine" />}
            {cashBal > 0 && <Debit amount={cashBal} details="Cash" />}
            {bankBal > 0 && <Debit amount={bankBal} details="Bank" />}
            {expenseBal > 0 && <Debit amount={expenseBal} details="Expenses" />}

            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>TOTAL</td>
              <td className="center underline">
                <b>{numberWithCommas(totalDebit)}</b>
              </td>
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

export default TrialBalance;
