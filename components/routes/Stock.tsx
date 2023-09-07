"use client";
import type { FC } from "react";
import React, { useRef } from "react";

import type { StockType } from "@/types";
import { getDate, numberWithCommas } from "@/utils";

import AccountTop from "../common/AccoutTop";
import PrintButton from "../common/Print";

const Item: FC<Partial<StockType>> = ({
  item,
  price,
  createdat,
  quantity,
  selling_price: sellingPrice,
  quantity_sold: quantitySold,
}) => {
  return (
    <tr>
      <td>{getDate(createdat)}</td>
      <td>{item}</td>
      <td className="center">{numberWithCommas(quantity ?? 0)}</td>
      <td className="center">{numberWithCommas(price ?? 0)}</td>
      <td className="center">{numberWithCommas(sellingPrice ?? 0)}</td>
      <td className="center">{numberWithCommas(quantitySold ?? 0)}</td>
    </tr>
  );
};

type Props = {
  stock: StockType[];
};

const Stock: FC<Props> = ({ stock }) => {
  const totalQty = stock.map((c) => c.quantity).reduce((a, b) => a + b, 0);

  const sold =
    stock
      .map((c) => c.quantity_sold)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
  const componentRef = useRef(null);
  return (
    <>
      <div className="card-panel" ref={componentRef}>
        <AccountTop account="Stock Account" />

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
            {stock.map((t) => (
              <Item
                key={t.id}
                item={t.item}
                price={t.price}
                createdat={t.createdat}
                quantity={t.quantity}
                selling_price={t.selling_price}
                quantity_sold={t.quantity_sold}
              />
            ))}
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
