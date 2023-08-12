import M from "materialize-css";
import type { FC } from "react";
import React, { useEffect } from "react";

import type { CompanyProps } from "@/types";

import Purchase from "./PurchaseStock";
import SellStock from "./Sell";

const ManageStock: FC<CompanyProps> = ({ _id }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

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
          <Purchase id={_id} />
        </div>
        <div id="sellStock" className="col s12">
          <SellStock id={_id} />
        </div>
      </div>
    </>
  );
};

export default ManageStock;
