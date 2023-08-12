"use client";
import Link from "next/link";
import type { FC } from "react";
import React from "react";

import { useTypedSelector } from "@/redux/stateTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Company: FC<{ c: any }> = ({ c }) => {
  const { name, desc, _id } = c;
  //   console.log('company', c);
  return (
    <div className="col s12 m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title center">{name}</span>
          <p>{desc}</p>
        </div>
        <div className="card-action center">
          <Link href={`/company/${_id}`} className="btn-floating orange">
            <i className="material-icons">arrow_forward</i>
          </Link>
          {/* <a href="#!">This is a link</a> */}
        </div>
      </div>
    </div>
  );
};

const Companies = (): React.ReactNode => {
  const { companies } = useTypedSelector((state) => state.companies);
  // const { companies } = companies;
  // console.log('companies', companies);
  return (
    <>
      {companies.map((c) => (
        <Company c={c} key={c._id} />
      ))}
    </>
  );
};

export default Companies;
