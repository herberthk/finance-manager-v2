import type { FC } from "react";

import type { TransactionType } from "@/types";
import { getDate, numberWithCommas } from "@/utils";

const Debit: FC<TransactionType> = ({ amount, details, createdat }) => {
  return (
    <tr>
      <td>{getDate(createdat)}</td>
      <td>{details === "Bank" ? "Balance b/d" : details}</td>
      {/* <td>{code}</td> */}
      <td className="center">{numberWithCommas(amount || 0)}</td>
      <td className="center"></td>
      <td className="center"></td>
      <td className="center"></td>
    </tr>
  );
};

export default Debit;
