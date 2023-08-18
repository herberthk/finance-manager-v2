import dayjs from "dayjs";
import type { FC } from "react";

import type { DebitCredit } from "@/types";
import { numberWithCommas } from "@/utils";

const Debit: FC<DebitCredit> = ({ amount, details, createdat }) => {
  return (
    <tr>
      <td>{dayjs(createdat).format("DD/MM/YYYY")}</td>
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
