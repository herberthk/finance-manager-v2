import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/types";
import { generateCode } from "@/utils";

interface Params {
  companyId: string;
  cashBalance: number;
  bankBalance: number;
}

export const manageOpeningBalance = async ({
  bankBalance,
  cashBalance,
  companyId,
}: Params): Promise<{
  errors: string[];
}> => {
  const errors: string[] = [];
  const supabase = createClientComponentClient<Database>();
  let code;
  if (cashBalance) {
    code = generateCode();

    const { error: err1 } = await supabase.from("cash").insert([
      {
        company_id: companyId,
        code,
        amount: cashBalance,
        details: "Balance b/d",
      },
    ]);
    err1 && errors.push(err1.message);
    code = generateCode();
    const { error: err2 } = await supabase.from("capital").insert([
      {
        company_id: companyId,
        code,
        amount: cashBalance,
        details: "Cash",
      },
    ]);
    err2 && errors.push(err2.message);
    code = generateCode();
    const code2 = generateCode();
    const { error: err3 } = await supabase.from("journal").insert([
      {
        company_id: companyId,
        code,
        amount: cashBalance,
        details: "Cash",
        type: "dr",
      },
      {
        company_id: companyId,
        code: code2,
        amount: cashBalance,
        details: "Capital",
        type: "cr",
      },
    ]);
    err3 && errors.push(err3.message);
  }

  if (bankBalance) {
    code = generateCode();

    const { error: err1 } = await supabase.from("bank").insert([
      {
        company_id: companyId,
        code,
        amount: bankBalance,
        details: "Balance b/d",
      },
    ]);
    err1 && errors.push(err1.message);
    code = generateCode();
    const { error: err2 } = await supabase.from("capital").insert([
      {
        company_id: companyId,
        code,
        amount: bankBalance,
        details: "Bank",
      },
    ]);
    err2 && errors.push(err2.message);
    code = generateCode();
    const code2 = generateCode();
    const { error: err3 } = await supabase.from("journal").insert([
      {
        company_id: companyId,
        code,
        amount: bankBalance,
        details: "Bank",
        type: "dr",
      },
      {
        company_id: companyId,
        code: code2,
        amount: bankBalance,
        details: "Capital",
        type: "cr",
      },
    ]);
    err3 && errors.push(err3.message);
  }

  return { errors };
};
