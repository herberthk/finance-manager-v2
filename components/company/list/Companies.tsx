// "use client";
import Link from "next/link";
import type { FC } from "react";

import type { Company } from "@/types";

type CompanyProps = {
  company: Company;
};

const List: FC<CompanyProps> = ({ company }) => {
  return (
    <div className="col s12 m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title center">{company?.name}</span>
          <p>{company?.description}</p>
        </div>
        <div className="card-action center">
          <Link
            href={`/company/${company?.id}`}
            className="btn-floating orange">
            <i className="material-icons">arrow_forward</i>
          </Link>
        </div>
      </div>
    </div>
  );
};

type CompaniesProp = {
  companies: Company[];
};

const Companies: FC<CompaniesProp> = ({ companies }) => {
  return (
    <>
      {companies?.map((company) => <List company={company} key={company.id} />)}
    </>
  );
};

export default Companies;
