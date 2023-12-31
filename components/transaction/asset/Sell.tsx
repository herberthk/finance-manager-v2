import M from "materialize-css";
import type { FC } from "react";
import React, { useState } from "react";

import { useCompanyStore } from "@/store";
import {
  sellLandByCash,
  SellLandByCheque,
  sellMachineByCash,
  sellMachineByCheque,
  sellVehicleByCash,
  sellVehicleByCheque,
} from "@/transactions";
import { numberWithCommas } from "@/utils";

type Name = "land" | "machine" | "vehicle" | "";
type Account = "cash" | "bank" | "";

type Props = {
  landBalance: number;
  vehicleBalance: number;
  machineBalance: number;
};

const SellAsset: FC<Props> = ({
  landBalance,
  machineBalance,
  vehicleBalance,
}) => {
  const id = useCompanyStore((state) => state.company?.id);

  const [name, setName] = useState<Name>("");
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState<number>();
  const [account, setAccount] = useState<Account>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const changeAccount = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setAccount(e.target.value as Account);

  const changeName = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setName(e.target.value as Name);

  const send = async () => {
    if (!amount || !name) {
      M.toast({
        html: "Asset name and amout are required",
        classes: "rounded red",
      });
      return;
    }
    if (name === "land") {
      if (landBalance === 0) {
        M.toast({
          html: "Land already sold",
          classes: "rounded red",
        });
        return;
      }
    }
    if (name === "machine") {
      if (machineBalance === 0) {
        M.toast({
          html: "Machine already sold",
          classes: "rounded red",
        });
        return;
      }
    }
    if (name === "vehicle") {
      if (vehicleBalance === 0) {
        M.toast({
          html: "Vehicle already sold",
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
          // Sell with cash
          const { errors } = await sellLandByCash({
            amount,

            companyId: id,
            details,
          });
          errors && setErrors((prev) => [...prev, ...errors]);
        }
        if (account === "bank") {
          // Sell with cheque
          const { errors } = await SellLandByCheque({
            amount,
            companyId: id,
            details,
          });
          errors && setErrors((prev) => [...prev, ...errors]);
        }
      }
      if (name === "machine") {
        if (account === "cash") {
          // Sell with cash
          const { errors } = await sellMachineByCash({
            amount,
            companyId: id,
            details,
          });
          errors && setErrors((prev) => [...prev, ...errors]);
        }
        if (account === "bank") {
          // Sell with cheque
          const { errors } = await sellMachineByCheque({
            amount,
            companyId: id,
            details,
          });
          errors && setErrors((prev) => [...prev, ...errors]);
        }
      }

      if (name === "vehicle") {
        if (account === "cash") {
          // Sell with cash
          const { errors } = await sellVehicleByCash({
            amount,
            companyId: id,
            details,
          });
          errors && setErrors((prev) => [...prev, ...errors]);
        }
        if (account === "bank") {
          // Sell with cheque
          const { errors } = await sellVehicleByCheque({
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
          <select onChange={changeName}>
            <option
              className="black-text"
              selected
              disabled
              defaultValue={name}>
              Select asset to sell
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
          <label htmlFor="amount">
            <b>Select asset to sell</b>
          </label>
        </div>

        <div className="input-field col s12">
          <select onChange={changeAccount}>
            <option className="black-text" selected disabled defaultValue="">
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
            <b>Sell asset using:</b>
          </label>
        </div>
        {name && (
          <ul className="collection">
            {name === "machine" && (
              <li className="collection-item black-text">
                Current machine value: ${" "}
                <b>{numberWithCommas(machineBalance)}</b>
              </li>
            )}
            {name === "land" && (
              <li className="collection-item black-text">
                Current land value: $ <b>{numberWithCommas(landBalance)}</b>
              </li>
            )}
            {name === "vehicle" && (
              <li className="collection-item black-text">
                Current vehicle value: ${" "}
                <b>{numberWithCommas(vehicleBalance)}</b>
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

export default SellAsset;
