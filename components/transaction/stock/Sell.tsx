import M from "materialize-css";
import type { FC } from "react";
import React, { useState } from "react";

import { useCompanyStore } from "@/store";
import { sellStockWithCash, sellStockWithCheque } from "@/transactions";
import type { StockType } from "@/types";
import { numberWithCommas } from "@/utils/helpers";

type Account = "cash" | "bank" | "";

type Props = {
  cashBal: number;
  bankBal: number;
  stockItems: StockType[];
};

const SellStock: FC<Props> = ({ bankBal, cashBal, stockItems }) => {
  const id = useCompanyStore((state) => state.company?.id);
  const [itemName, setItemName] = useState("");
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>();
  const [account, setAccount] = useState<Account>("");
  const [loading, setLoading] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setAccount(e.target.value as Account);
  const selectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const item = stockItems.filter((t) => t.item === e.target.value);
    setItemName(e.target.value);
    const selectedItem = { ...item[0] };
    const quantitySold = selectedItem.quantity_sold ?? 0;
    setSelectedQuantity(selectedItem.quantity - quantitySold);
    setUnitPrice(selectedItem.price);
    setSellingPrice(selectedItem.selling_price);
  };

  const send = async () => {
    if (!itemName || !sellingPrice || !quantity) {
      M.toast({
        html: "Item name, quantity are required",
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
    if (quantity > selectedQuantity) {
      M.toast({
        html: "Insuficient quantity",
        classes: "rounded red",
      });
      M.toast({
        html: `Only ${selectedQuantity} ${itemName} are available`,
        classes: "rounded red",
      });
      return;
    }
    if (!id) return;
    try {
      setLoading(true);
      if (account === "cash") {
        // sell with cash
        const { errors } = await sellStockWithCash({
          quantity,
          sellingPrice,
          itemName,
          companyId: id,
        });
        errors && setErrors((prev) => [...prev, ...errors]);
      }
      if (account === "bank") {
        // sell with cheque
        const { errors } = await sellStockWithCheque({
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
      setUnitPrice(0);
      setSellingPrice(0);
      setQuantity(undefined);
      setAccount("");
      setErrors([]);
    } catch (error) {
      setLoading(false);
      M.toast({ html: "Error try again", classes: "rounded red" });
    }
  };

  //   console.log('My items', items);
  return (
    <div className="card-panel">
      <div className="row">
        <div className="input-field col s12">
          <select onChange={selectItem}>
            <option
              className="black-text"
              selected
              disabled
              defaultValue={itemName}>
              Select item to sell
            </option>
            {stockItems.map(
              (t) =>
                t.quantity > 0 && (
                  <option key={t.id} className="black-text" value={t.item}>
                    {t.item}
                  </option>
                ),
            )}
          </select>
          <label htmlFor="ggg">
            <b>Select item to sell</b>
          </label>
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
          <label htmlFor="qty">
            <b>Buy asset using:</b>
          </label>
        </div>
        {itemName && (
          <ul className="collection">
            <li className="collection-item black-text">
              Quantity available: <b>{numberWithCommas(selectedQuantity)}</b>
            </li>
            <li className="collection-item black-text">
              Unit price: $ <b>{numberWithCommas(unitPrice)}</b>
            </li>
            <li className="collection-item black-text">
              Selling price: $ <b>{numberWithCommas(sellingPrice)}</b>
            </li>
          </ul>
        )}
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

        {itemName && (
          <div className="input-field col s12">
            <i className="material-icons prefix teal-text">control_point</i>
            <input
              id="qty"
              defaultValue={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              type="number"
              className="validate black-text"
            />
            <label htmlFor="qty">Quantity you are selling</label>
          </div>
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

export default SellStock;
