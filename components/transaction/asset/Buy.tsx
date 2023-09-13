import M from "materialize-css";
import type { FC } from "react";
import React, { useState } from "react";

import { useCompanyStore } from "@/store";
import {
  buyLandByCash,
  buyLandByCheque,
  buyMachineByCash,
  buyMachineByCheque,
  buyVehicleByCash,
  buyVehicleByCheque,
} from "@/transactions";
import { numberWithCommas } from "@/utils";

type Account = "cash" | "bank" | "";
type Name = "land" | "machine" | "vehicle" | "";

type Props = {
  cashBalance: number;
  bankBalance: number;
};

const BuyAsset: FC<Props> = ({ bankBalance, cashBalance }) => {
  const id = useCompanyStore((state) => state.company?.id);
  const [name, setName] = useState<Name>("");
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState<number>();
  const [account, setAccount] = useState<Account>("cash");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const change = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setAccount(e.target.value as Account);

  const send = async () => {
    if (!amount || !name) {
      M.toast({
        html: "Asset name and amount are required",
        classes: "rounded red",
      });
      return;
    }

    // If amount is not a number
    if (!isFinite(amount)) {
      M.toast({
        html: "Invalid amount format, remove commas",
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

    try {
      setLoading(true);
      if (name === "land") {
        if (account === "cash") {
          // buy with cash
          const { errors } = await buyLandByCash({
            amount,
            companyId: id,
            details,
          });
          errors && setErrors((prev) => [...prev, ...errors]);
        }
        if (account === "bank") {
          // Buy with cheque
          const { errors } = await buyLandByCheque({
            amount,
            companyId: id,
            details,
          });
          errors && setErrors((prev) => [...prev, ...errors]);
        }
      }
      if (name === "machine") {
        if (account === "cash") {
          // buy with cash
          const { errors } = await buyMachineByCash({
            amount,
            companyId: id,
            details,
          });
          errors && setErrors((prev) => [...prev, ...errors]);
        }
        if (account === "bank") {
          // Pay with cheque
          const { errors } = await buyMachineByCheque({
            amount,
            companyId: id,
            details,
          });
          errors && setErrors((prev) => [...prev, ...errors]);
        }
      }
      if (name === "vehicle") {
        if (account === "cash") {
          // buy with cash
          const { errors } = await buyVehicleByCash({
            amount,
            companyId: id,
            details,
          });
          errors && setErrors((prev) => [...prev, ...errors]);
        }
        if (account === "bank") {
          // Pay with cheque
          const { errors } = await buyVehicleByCheque({
            amount,
            companyId: id,
            details,
          });
          errors && setErrors((prev) => [...prev, ...errors]);
        }
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
      setDetails("");
    } catch (error) {
      setLoading(false);
      M.toast({ html: "Error try again", classes: "rounded red" });
    }
  };
  return (
    <div className="card-panel">
      <div className="row">
        <div className="input-field col s12">
          <select onChange={(e) => setName(e.target.value as Name)}>
            <option className="black-text" selected disabled defaultValue="">
              Select asset to buy
            </option>
            <option className="black-text" value="land">
              Land
            </option>
            <option className="black-text" value="vehicle">
              Vehicle
            </option>
            <option className="black-text" value="machine">
              Machine
            </option>
          </select>
          <label htmlFor="gg">
            <b>Select asset to buy</b>
          </label>
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
          <label htmlFor="gg">
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
            onChange={(e) => setAmount(+e.target.value)}
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

export default BuyAsset;
