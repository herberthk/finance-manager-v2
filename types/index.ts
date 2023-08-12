import type { ReactNode } from "react";
export * from "./database.types";
export * from "./store";

export type AssetType = "land" | "vehicle" | "machine";
export type Direction = "next" | "previous";
export interface AxiosResponse {
  success: Boolean;
  error: string;
  data: {
    name: string;
    _id: string;
    email: string;
  };
  token: string;
  info: string;
}

export interface CompanyResponse {
  success: Boolean;
  error: string;
  data: {
    name: string;
    email: string;
    location: string;
    desc: string;
    fb: string;
    yt: string;
    twt: string;
    tel: string;
    bank: string;
  };
}

export interface CompanyProps {
  _id: string;
  name: string;
  email: string;
  location: string;
  desc: string;
  fb: string;
  yt: string;
  twt: string;
  tel: string;
  bank: string;
}

export interface NavLinks {
  route: string;
  name: string;
  Icon: ReactNode;
}
