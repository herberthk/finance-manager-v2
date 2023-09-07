"use client";
import type { FC } from "react";
import React, { useRef } from "react";

import type { LedgerData } from "@/types";
import { useAccountBalance } from "@/utils";
import { numberWithCommas } from "@/utils/helpers";

import AccountTop from "../common/AccoutTop";
import PrintButton from "../common/Print";
//TODo
// Make Debit and Credit reusable like others
const Debit: FC<Partial<LedgerData>> = ({ cr, diff, dr, details }) => {
  return (
    <tr>
      <td>{details}</td>
      <td className="center">{numberWithCommas(dr || 0)}</td>
      <td className="center">{cr === 0 ? "-" : numberWithCommas(cr || 0)}</td>
      <td className="center">{numberWithCommas(diff || 0)}</td>
      <td className="center"></td>
    </tr>
  );
};

const Credit: FC<Partial<LedgerData>> = ({ cr, details }) => {
  return (
    <tr>
      <td>{details}</td>
      <td className="center"></td>
      <td className="center">{numberWithCommas(cr || 0)}</td>
      <td className="center"></td>
      <td className="center">{numberWithCommas(cr || 0)}</td>
    </tr>
  );
};

const Ledger = (): React.ReactNode => {
  const {
    landBal,
    bankBal,
    machineBal,
    vehicleBal,
    cashBal,
    totalCredit,
    totalDebit,
    totalCapital,
    cashCreditTotal,
    bankCreditTotal,
    bankDebitTotal,
    cashDebitTotal,
    landDebitTotal,
    vehicleDebitTotal,
    machineDebitTotal,
    landCreditTotal,
    vehicleCreditTotal,
    machineCreditTotal,
    purchases,
    salesBal,
    expenseBal,
  } = useAccountBalance();
  const componentRef = useRef(null);
  // console.log('sales bal', salesBal);
  return (
    <>
      <div className="card-panel" ref={componentRef}>
        <AccountTop account="General Ledger" />
        <table className="black-text border_table">
          <thead>
            <tr>
              {/* <th>Date</th> */}
              <th>Details</th>
              <th colSpan={2} className="center">
                Transaction
              </th>
              <th className="center" colSpan={2}>
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td className="center">Debit</td>
              <td className="center">Credit</td>
              <td className="center">Debit</td>
              <td className="center">Credit</td>
            </tr>
            <Credit cr={totalCapital} details="Capital" />
            {salesBal > 0 && <Credit cr={salesBal} details="Sales" />}

            {landBal > 0 && (
              <Debit
                diff={landBal}
                dr={landDebitTotal}
                cr={landCreditTotal}
                details="Land"
              />
            )}
            {vehicleBal > 0 && (
              <Debit
                diff={vehicleBal}
                dr={vehicleDebitTotal}
                cr={vehicleCreditTotal}
                details="Vehicle"
              />
            )}
            {machineBal > 0 && (
              <Debit
                diff={machineBal}
                dr={machineDebitTotal}
                cr={machineCreditTotal}
                details="Machine"
              />
            )}
            {cashBal > 0 && (
              <Debit
                diff={cashBal}
                dr={cashDebitTotal}
                cr={cashCreditTotal}
                details="Cash"
              />
            )}
            {purchases > 0 && (
              <Debit
                diff={purchases}
                dr={purchases}
                cr={0}
                details="Purchase"
              />
            )}
            {bankBal > 0 && (
              <Debit
                diff={bankBal}
                dr={bankDebitTotal}
                cr={bankCreditTotal}
                details="Bank"
              />
            )}
            {expenseBal > 0 && (
              <Debit
                diff={expenseBal}
                dr={expenseBal}
                cr={0}
                details="Expenses"
              />
            )}

            <tr>
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
            </tr>
          </tbody>
        </table>
      </div>
      <PrintButton componentRef={componentRef} />
    </>
  );
};

export default Ledger;
