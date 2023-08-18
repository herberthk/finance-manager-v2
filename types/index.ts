import type { ReactNode } from "react";

import type { Database } from "./database.types";
export * from "./database.types";
export * from "./graph";
export * from "./store";

export type AssetType = "land" | "vehicle" | "machine";
export type Direction = "next" | "previous";
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Company = Database["public"]["Tables"]["company"]["Row"];
export type Bank = Database["public"]["Tables"]["bank"]["Row"];
export type Capital = Database["public"]["Tables"]["capital"]["Row"];

export type DebitCredit = {
  amount: number;
  details: string;
  createdat: string;
  code?: string;
};

export interface NavLinks {
  route: string;
  name: string;
  Icon: ReactNode;
}
