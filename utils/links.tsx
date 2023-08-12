import { NavLinks } from "@/types";

export const transactionLinks: NavLinks[] = [
  {
    route: "asset",
    name: "Fixed Asset management",
    Icon: <i className="material-icons white-text">queue_play_next</i>,
  },
  {
    route: "managestock",
    name: "Stock management",
    Icon: <i className="material-icons white-text">assignment</i>,
  },
  {
    route: "pay",
    name: "Pay expenses",
    Icon: <i className="material-icons white-text">redeem</i>,
  },
];

export const accountsLinks: NavLinks[] = [
  {
    route: "cash",
    name: "Cash account",
    Icon: <i className="material-icons white-text">monetization_on</i>,
  },
  {
    route: "bank",
    name: "Bank account",
    Icon: <i className="material-icons white-text">account_balance</i>,
  },
  {
    route: "capital",
    name: "Capital account",
    Icon: <i className="material-icons white-text">functions</i>,
  },
  {
    route: "sales",
    name: "Sales account",
    Icon: <i className="material-icons white-text">pie_chart</i>,
  },
  {
    route: "stock",
    name: "Stock account",
    Icon: <i className="material-icons white-text">local_mall</i>,
  },
  {
    route: "expenses",
    name: "Expense account",
    Icon: <i className="material-icons white-text">redeem</i>,
  },
];

export const reportLinks: NavLinks[] = [
  {
    route: "cashbook",
    name: "Cash book",
    Icon: <i className="material-icons white-text">import_contacts</i>,
  },
  {
    route: "trialbalance",
    name: "Trial balance",
    Icon: <i className="material-icons white-text">line_style</i>,
  },
  {
    route: "ledger",
    name: "Ledger book",
    Icon: <i className="material-icons white-text">assignment</i>,
  },
  {
    route: "journal",
    name: "General Journal",
    Icon: <i className="material-icons white-text">receipt</i>,
  },
  {
    route: "incomestatement",
    name: "Income statement",
    Icon: <i className="material-icons white-text">pie_chart</i>,
  },
  {
    route: "balancesheet",
    name: "Balance sheet",
    Icon: <i className="material-icons white-text">dvr</i>,
  },
];
