import M from "materialize-css";
import type { FC } from "react";
import React, { useState } from "react";

import { buyStockWithCash, buyStockWithCheque } from "@/transactions";
import { numberWithCommas } from "@/utils";
import { useCompanyStore } from "@/zustand";

type Account = "cash" | "bank" | "";
type Props = {
  cashBal: number;
  bankBal: number;
};

const BuyStock: FC<Props> = ({ bankBal, cashBal }) => {
  const id = useCompanyStore((state) => state.company?.id);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState<number>();
  const [sellingPrice, setSellingPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [account, setAccount] = useState<Account>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setAccount(e.target.value as Account);
  const selectItem = (e: React.ChangeEvent<HTMLInputElement>) =>
    setItemName(e.target.value);

  const send = async () => {
    if (!itemName || !price || !quantity || !sellingPrice) {
      M.toast({
        html: "Item name, unit price, quantity and selling are required",
        classes: "rounded red",
      });
      return;
    }
    if (!account) {
      M.toast({
        html: "Select account type cash or bank",
        classes: "rounded red",
      });
      return;
    }

    if (account === "cash") {
      if (price * quantity > cashBal) {
        M.toast({
          html: "Insuficient cash balance",
          classes: "rounded red",
        });
        M.toast({
          html: `Your cash balance is $ ${numberWithCommas(cashBal)}`,
          classes: "rounded red",
        });
        return;
      }
    }
    if (account === "bank") {
      if (price * quantity > bankBal) {
        M.toast({
          html: "Insuficient bank balance",
          classes: "rounded red",
        });
        M.toast({
          html: `Your bank balance is $ ${numberWithCommas(bankBal)}`,
          classes: "rounded red",
        });
        return;
      }
    }
    if (!id) return;
    try {
      setLoading(true);
      if (account === "cash") {
        // buy with cash
        const { errors } = await buyStockWithCash({
          price,
          quantity,
          sellingPrice,
          itemName,
          companyId: id,
        });
        errors && setErrors((prev) => [...prev, ...errors]);
      }
      if (account === "bank") {
        // buy with cheque
        const { errors } = await buyStockWithCheque({
          price,
          quantity,
          sellingPrice,
          itemName,
          companyId: id,
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
      setItemName("");
      setPrice(undefined);
      setSellingPrice(undefined);
      setQuantity(undefined);
      setAccount("");
      setErrors([]);
    } catch (error) {
      setLoading(false);
      M.toast({ html: "Error try again", classes: "rounded red" });
    }
  };
  // console.log('Available', available);
  return (
    <div className="card-panel">
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix teal-text">
            account_balance_wallet
          </i>
          <input
            id="item"
            defaultValue={itemName}
            onChange={selectItem}
            type="text"
            className="validate black-text"
          />
          <label htmlFor="name">What do you want to buy</label>
        </div>

        <div className="input-field col s12">
          <select onChange={onChange}>
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
          <label htmlFor="yt">
            <b>Buy asset using:</b>
          </label>
        </div>
        {account && (
          <ul className="collection">
            {account === "cash" && (
              <li className="collection-item black-text">
                Cash balance: $ <b>{numberWithCommas(cashBal)}</b>
              </li>
            )}
            {account === "bank" && (
              <li className="collection-item black-text">
                Bank balance: $ <b>{numberWithCommas(bankBal)}</b>
              </li>
            )}
          </ul>
        )}

        <div className="input-field col s12">
          <i className="material-icons prefix teal-text">attach_money</i>
          <input
            id="pice"
            defaultValue={price}
            onChange={(e) => setPrice(+e.target.value)}
            type="number"
            className="validate black-text"
          />
          <label htmlFor="price">Unit price</label>
        </div>

        {itemName && (
          <>
            <div className="input-field col s12">
              <i className="material-icons prefix teal-text">control_point</i>
              <input
                id="qty"
                defaultValue={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
                type="number"
                className="validate black-text"
              />
              <label htmlFor="qty">Quantity</label>
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix teal-text">control_point</i>
              <input
                id="sp"
                defaultValue={sellingPrice}
                onChange={(e) => setSellingPrice(+e.target.value)}
                type="number"
                className="validate black-text"
              />
              <label htmlFor="sp">Selling price</label>
            </div>
          </>
        )}

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

export default BuyStock;
