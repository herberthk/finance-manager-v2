import type { FC } from "react";

import type { TransactionType } from "@/types";
import { getDate, numberWithCommas } from "@/utils";

const Credit: FC<TransactionType> = ({ amount, details, createdat }) => {
  return (
    <tr>
      <td className="center"></td>
      <td className="center"></td>
      <td className="center"></td>
      <td>{getDate(createdat)}</td>
      <td>{details}</td>
      <td className="center">{numberWithCommas(amount || 0)}</td>
      {/* <td>{code}</td> */}
    </tr>
  );
};

export default Credit;
