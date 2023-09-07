"use client";
import M from "materialize-css";
import React, { useEffect } from "react";

import type { StockType } from "@/types";

import BuyStock from "./Buy";
import SellStock from "./Sell";

const ManageStock = (): React.ReactNode => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  const stockItems: StockType[] = [];
  return (
    <>
      <h5 className="center black-text">Stock management</h5>
      <ul id="tabs-swipe-demo" className="tabs">
        <li className="tab col s6">
          <a className="active" href="#buyStock">
            <b>Buy stock</b>
          </a>
        </li>
        <li className="tab col s6">
          <a href="#sellStock">
            <b>Sell stock</b>
          </a>
        </li>
      </ul>
      <div className="row">
        <div id="buyStock" className="col s12">
          <BuyStock bankBal={0} cashBal={0} />
        </div>
        <div id="sellStock" className="col s12">
          <SellStock bankBal={0} cashBal={0} stockItems={stockItems} />
        </div>
      </div>
    </>
  );
};

export default ManageStock;
