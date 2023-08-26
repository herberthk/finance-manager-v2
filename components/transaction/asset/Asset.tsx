"use client";
import M from "materialize-css";
import React, { useEffect } from "react";

import BuyAsset from "./Buy";
import SellAsset from "./Sell";

const Asset = (): React.ReactNode => {
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
          <BuyAsset bankBalance={0} cashBalance={0} />
        </div>
        <div id="sellAsset" className="col s12">
          <SellAsset landBalance={0} machineBalance={0} vehicleBalance={0} />
        </div>
      </div>
    </>
  );
};

export default Asset;
