import dayjs from "dayjs";
import type { FC } from "react";
import React, { useRef } from "react";

import type { StockArray } from "@/redux/interface";
import { useTypedSelector } from "@/redux/stateTypes";
import type { CompanyProps } from "@/types";

import { numberWithCommas } from "../../utils/helpers";
import AccountTop from "../common/AccoutTop";
import PrintButton from "../common/Print";

const Item: FC<StockArray> = ({ item, price, pd, qty, sPrice, sqty }) => {
  return (
    <tr>
      <td>{dayjs(pd).format("DD/MM/YYYY")}</td>
      <td>{item}</td>
      <td className="center">{numberWithCommas(qty)}</td>
      <td className="center">{numberWithCommas(price)}</td>
      <td className="center">{numberWithCommas(sPrice)}</td>
      <td className="center">{numberWithCommas(sqty)}</td>
    </tr>
  );
};

const Stock: FC<CompanyProps> = ({ email, location, name }) => {
  const { stock } = useTypedSelector((state) => state.stock);
  let totalQty = 0;
  let sold = 0;
  const componentRef = useRef(null);
  return (
    <>
      <div className="card-panel" ref={componentRef}>
        <AccountTop
          account="Stock Account"
          name={name}
          email={email}
          location={location}
        />

        <table className="black-text striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th className="center">Quantity</th>
              <th className="center">Unit price (USD)</th>
              <th className="center">Selling Price (USD)</th>
              <th className="center">Sold</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((t) => {
              totalQty += t.qty;
              sold += t.sqty;
              // total += t.price * t.qty;

              return (
                <Item
                  key={t._id}
                  item={t.item}
                  price={t.price}
                  pd={t.pd}
                  qty={t.qty}
                  sPrice={t.sPrice}
                  sqty={t.sqty}
                />
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>TOTAL</td>
              <td> </td>
              <td className="center underline">
                <b>{numberWithCommas(totalQty)}</b>
              </td>
              <td></td>
              <td></td>
              <td className="center underline">
                <b>{numberWithCommas(sold)}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PrintButton componentRef={componentRef} />
    </>
  );
};

export default Stock;
