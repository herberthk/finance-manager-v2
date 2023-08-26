import dayjs from "dayjs";
import type { FC } from "react";

import type { TransactionType } from "@/types";
import { numberWithCommas } from "@/utils";

const Credit: FC<TransactionType> = ({ amount, details, createdat }) => {
  return (
    <tr>
      <td className="center"></td>
      <td className="center"></td>
      <td className="center"></td>
      <td>{dayjs(createdat).format("DD/MM/YYYY")}</td>
      <td>{details}</td>
      <td className="center">{numberWithCommas(amount || 0)}</td>
      {/* <td>{code}</td> */}
    </tr>
  );
};

export default Credit;
