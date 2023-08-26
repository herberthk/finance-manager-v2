import type { ReactNode } from "react";

import type { Database } from "./database.types";
export * from "./database.types";
export * from "./graph";
export * from "./store";

export type AssetType = "land" | "vehicle" | "machine";
export type Direction = "next" | "previous";
export type UserType = Database["public"]["Tables"]["users"]["Row"];
export type CompanyType = Database["public"]["Tables"]["company"]["Row"];
export type BankType = Database["public"]["Tables"]["bank"]["Row"];
export type CapitalType = Database["public"]["Tables"]["capital"]["Row"];
export type CashType = Database["public"]["Tables"]["cash"]["Row"];
export type CashbooKType = Database["public"]["Tables"]["cashbook"]["Row"];
export type ExpenseType = Database["public"]["Tables"]["expense"]["Row"];
export type JournalType = Database["public"]["Tables"]["journal"]["Row"];
export type SalesType = Database["public"]["Tables"]["sales"]["Row"];
export type StockType = Database["public"]["Tables"]["stock"]["Row"];
export type Account = BankType;
export interface LedgerData {
  id?: string;
  diff: number;
  dr: number;
  cr: number;
  createdAt?: string;
  code?: string;
  type?: "dr" | "cr";
  details: string;
}
export type TransactionType = {
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
