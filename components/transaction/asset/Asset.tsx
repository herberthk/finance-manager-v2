import M from "materialize-css";
import type { FC } from "react";
import React, { useEffect } from "react";

import type { CompanyProps } from "@/types";

import BuyAsset from "./Buy";
import SellAsset from "./Sell";

const Asset: FC<CompanyProps> = ({ _id }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <h5 className="center black-text">Asset management</h5>
      <ul id="tabs-swipe-demo" className="tabs">
        <li className="tab col s6">
          <a className="active" href="#buyAsset">
            <b>Buy asset</b>
          </a>
        </li>
        <li className="tab col s6">
          <a href="#sellAsset">
            <b>Sell asset</b>
          </a>
        </li>
      </ul>
      <div className="row">
        <div id="buyAsset" className="col s12">
          <BuyAsset id={_id} />
        </div>
        <div id="sellAsset" className="col s12">
          <SellAsset id={_id} />
        </div>
      </div>
    </>
  );
};

export default Asset;
