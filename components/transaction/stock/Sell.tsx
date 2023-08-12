import axios from "axios";
import M from "materialize-css";
import type { FC } from "react";
import React, { useState } from "react";

import { useTypedSelector } from "@/redux/stateTypes";
import type { AxiosResponse } from "@/types";
import { SERVER_URL } from "@/utils/constants";
import { arrayDiffTotal, numberWithCommas } from "@/utils/helpers";
import { useCustomDispatch } from "@/utils/hooks";

interface Props {
  id: string;
}

type Account = "cash" | "bank" | "";

const SellStock: FC<Props> = ({ id }) => {
  const { token } = useTypedSelector((state) => state.auth);
  axios.defaults.headers.common["Authorization"] = token;
  const { cash } = useTypedSelector((state) => state.cash);
  const { bank } = useTypedSelector((state) => state.bank);
  const { stock } = useTypedSelector((state) => state.stock);
  const [item, setItem] = useState("");
  const [sPrice, setSprice] = useState<number>(0);
  const [qty, setQty] = useState<number>();
  const [account, setAccount] = useState<Account>("");
  const [loading, setLoading] = useState(false);
  const cashBal = arrayDiffTotal(cash);
  const bankBal = arrayDiffTotal(bank);
  const [selQty, setSelctedQty] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const {
    getBank,
    getCapital,
    getCash,
    getJournal,
    goTo,
    getLand,
    getMachine,
    getVehicle,
    getCashBook,
    getExpenses,
    getSales,
    getStock,
  } = useCustomDispatch();

  const change = (e: {
    target: { value: string | ((prevState: Account) => Account) };
  }) => {
    const val = e.target.value as Account;
    setAccount(val);
  };
  const send = async () => {
    if (!item || !sPrice || !qty) {
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
    if (qty > selQty) {
      M.toast({
        html: "Insuficient quantity",
        classes: "rounded red",
      });
      M.toast({
        html: `Only ${selQty} ${item} are available`,
        classes: "rounded red",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${SERVER_URL}/transaction/sellstock`, {
        item,
        sPrice,
        qty,
        account,
        id,
      });
      const { success, error } = res.data as AxiosResponse;
      setLoading(false);
      if (!success) {
        M.toast({ html: error, classes: "rounded red" });
        // setInvalid(true);
      } else {
        M.toast({ html: "Success", classes: "rounded green" });
        setSprice(0);
        setItem("");
        setQty(undefined);
        await getBank(res.data.data.bank);
        await getCapital(res.data.data.capital);
        await getCash(res.data.data.cash);
        await getJournal(res.data.data.journal);
        await getLand(res.data.data.land);
        await getMachine(res.data.data.machine);
        await getVehicle(res.data.data.vehicle);
        await getStock(res.data.data.stock);
        await getCashBook(res.data.data.cashbook);
        await getSales(res.data.data.sales);
        await getExpenses(res.data.data.expenses);
        await goTo("sales");
        // }
      }
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
          <select
            onChange={(e) => {
              const qtr = stock.filter((t) => t.item === e.target.value);
              setItem(e.target.value);
              const [qt] = qtr;
              const { qty, price, sPrice, sqty } = qt;

              setSelctedQty(qty - sqty);
              setUnitPrice(price);
              setSprice(sPrice);
            }}>
            <option
              className="black-text"
              selected
              disabled
              defaultValue={item}>
              Select item to sell
            </option>
            {stock.map(
              (t) =>
                t.qty > 0 && (
                  <option key={t._id} className="black-text" value={t.item}>
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
          <label htmlFor="qty">
            <b>Buy asset using:</b>
          </label>
        </div>
        {item && (
          <ul className="collection">
            <li className="collection-item black-text">
              Quantity available: <b>{numberWithCommas(selQty)}</b>
            </li>
            <li className="collection-item black-text">
              Unit price: $ <b>{numberWithCommas(unitPrice)}</b>
            </li>
            <li className="collection-item black-text">
              Selling price: $ <b>{numberWithCommas(sPrice)}</b>
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

        {item && (
          <div className="input-field col s12">
            <i className="material-icons prefix teal-text">control_point</i>
            <input
              id="qty"
              defaultValue={qty}
              onChange={(e) => {
                const input = (e.target as HTMLInputElement).value as unknown;
                let val = input as number;
                setQty(val);
              }}
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
