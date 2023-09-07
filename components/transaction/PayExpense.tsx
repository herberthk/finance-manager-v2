"use client";
import M from "materialize-css";
import type { FC } from "react";
import React, { useEffect, useState } from "react";

import { payExpenseByCash, payExpenseByCheque } from "@/transactions";
import { numberWithCommas } from "@/utils";
import { useCompanyStore } from "@/zustand";

type Account = "cash" | "bank" | "";

type Props = {
  cashBalance: number;
  bankBalance: number;
};

const PayExpense: FC<Props> = ({ bankBalance, cashBalance }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  const id = useCompanyStore((state) => state.company?.id);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>();
  const [account, setAccount] = useState<Account>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const change = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setAccount(e.target.value as Account);

  const send = async () => {
    if (!amount || !name) {
      M.toast({
        html: "Name and amount are required",
        classes: "rounded red",
      });
      return;
    }

    if (account === "cash") {
      if (amount > cashBalance) {
        M.toast({
          html: "Insuficient cash balance",
          classes: "rounded red",
        });
        M.toast({
          html: `Your cash balance is $ ${numberWithCommas(cashBalance)}`,
          classes: "rounded red",
        });
        return;
      }
    }
    if (account === "bank") {
      if (amount > bankBalance) {
        M.toast({
          html: "Insuficient bank balance",
          classes: "rounded red",
        });
        M.toast({
          html: `Your bank balance is $ ${numberWithCommas(bankBalance)}`,
          classes: "rounded red",
        });
        return;
      }
    }
    if (!id) return;
    setLoading(true);
    try {
      if (account === "cash") {
        // Pay with cash
        const { errors } = await payExpenseByCash({
          amount,
          companyId: id,
          name,
        });
        errors && setErrors((prev) => [...prev, ...errors]);
      }
      if (account === "bank") {
        // Pay with bank account
        const { errors } = await payExpenseByCheque({
          amount,

          companyId: id,
          name,
        });
        errors && setErrors((prev) => [...prev, ...errors]);
      }
      setLoading(false);
      if (errors.length > 0) {
        errors.forEach((error) =>
          M.toast({ html: error, classes: "rounded red" }),
        );
        return;
      }
      M.toast({ html: "Success", classes: "rounded green" });
      setAmount(undefined);
      setName("");
    } catch (error) {
      setLoading(false);
      M.toast({ html: "Error try again", classes: "rounded red" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-panel">
      <h5 className="center black-text">Pay for expense</h5>
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix teal-text">
            account_balance_wallet
          </i>
          <input
            id="name"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="validate black-text"
          />
          <label htmlFor="name">What are you paying for</label>
        </div>

        <div className="input-field col s12">
          <select onChange={change}>
            <option
              className="black-text"
              selected
              disabled
              defaultValue={account}>
              Select account
            </option>
            <option className="black-text" value="cash">
              Cash
            </option>
            <option className="black-text" value="bank">
              Bank
            </option>
          </select>
          <label htmlFor="amount">
            <b>Buy asset using:</b>
          </label>
        </div>
        {account && (
          <ul className="collection">
            {account === "cash" && (
              <li className="collection-item black-text">
                Cash balance: $ <b>{numberWithCommas(cashBalance)}</b>
              </li>
            )}
            {account === "bank" && (
              <li className="collection-item black-text">
                Bank balance: $ <b>{numberWithCommas(bankBalance)}</b>
              </li>
            )}
          </ul>
        )}

        <div className="input-field col s12">
          <i className="material-icons prefix teal-text">attach_money</i>
          <input
            id="amount"
            defaultValue={amount}
            onChange={(e) => {
              const input = (e.target as HTMLInputElement).value as unknown;
              let val = input as number;
              setAmount(val);
            }}
            type="number"
            className="validate black-text"
          />
          <label htmlFor="amount">Amount</label>
        </div>
        <div className="clearfix"></div>
        {!loading ? (
          <button
            className="btn-flat waves-effect waves-teal right shadow"
            onClick={send}>
            <b>send</b>
            <i className="material-icons right">send</i>
          </button>
        ) : (
          <button className="btn-flat waves-effect waves-teal shadow  right">
            <b>please wait</b>
          </button>
        )}
      </div>
    </div>
  );
};

export default PayExpense;
