"use client";
import Link from "next/link";
import React from "react";

import { accountsLinks, reportLinks, transactionLinks } from "@/utils/links/links";
import { useCompanyStore } from "@/zustand";

import { Collapsible } from "./comps";
// import SetupModal from "./SetupModal";

const Side = (): React.ReactNode => {
  const id = useCompanyStore((state) => state.company?.id);
  return (
    <section className="col s12 m3 side side_margin">
      <ul className="collection with-header">
        <li className="collection-header transparent">
          <h2>MY SHORT CUTS</h2>
        </li>
        <li className="collection-item transparent collection_item_overide">
          <Link href={`/company/${id}`}>
            <Collapsible>
              <div>
                <i className="material-icons white-text">home</i>
              </div>
              <div>HOME</div>
            </Collapsible>
          </Link>
        </li>
        <li className="collection-item transparent collection_item_overide">
          <Link href={`/company/${id}/about`}>
            <Collapsible>
              <div>
                <i className="material-icons white-text">info</i>
              </div>
              <div>ABOUT</div>
            </Collapsible>
          </Link>
        </li>
      </ul>
      <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header transparent">
            <i className="material-icons">create</i>
            TRANSACTIONS
          </div>

          <div className="collapsible-body collapsible_overide">
            {transactionLinks.map(({ Icon, name, route }) => (
              <Link key={name} href={`/company/${id}/${route}`}>
                <Collapsible>
                  <div>{Icon}</div>
                  <div>{name}</div>
                </Collapsible>
              </Link>
            ))}
          </div>
        </li>

        <li>
          <div className="collapsible-header transparent">
            <i className="material-icons">account_balance_wallet</i>
            ACCOUNTS
          </div>
          <div className="collapsible-body collapsible_overide">
            {accountsLinks.map(({ Icon, name, route }) => (
              <Link key={route} href={`/company/${id}/${route}`}>
                <Collapsible>
                  <div>{Icon}</div>
                  <div>{name}</div>
                </Collapsible>
              </Link>
            ))}
          </div>
        </li>
        <li>
          <div className="collapsible-header transparent">
            <i className="material-icons">business_center</i>
            REPORTS
          </div>
          <div className="collapsible-body collapsible_overide">
            {reportLinks.map(({ Icon, name, route }) => (
              <Link key={route} href={`/company/${id}/${route}`}>
                <Collapsible>
                  <div>{Icon}</div>
                  <div>{name}</div>
                </Collapsible>
              </Link>
            ))}
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Side;
