import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/types";
import { generateCode } from "@/utils";

type Params = {
  companyId: string;
  amount: number;
  details: string;
};

export const buyVehicleByCheque = async ({
  details,
  amount,
  companyId,
}: Params): Promise<{
  errors: string[];
}> => {
  const errors: string[] = [];
  const supabase = createClientComponentClient<Database>();
  let code;
  code = generateCode();
  // Create entry in bank account
  const { error: err1 } = await supabase.from("bank").insert([
    {
      company_id: companyId,
      code,
      amount,
      details,
      type: "cr",
    },
  ]);
  err1 && errors.push(err1.message);
  // Create cashbook entry
  code = generateCode();
  const { error: err2 } = await supabase.from("cashbook").insert([
    {
      company_id: companyId,
      code,
      bank: amount,
      details,
      type: "cr",
    },
  ]);
  err2 && errors.push(err2.message);
  // Create expense entry
  code = generateCode();
  const { error: err3 } = await supabase.from("vehicle").insert([
    {
      company_id: companyId,
      code,
      amount,
      details,
    },
  ]);
  err3 && errors.push(err3.message);
  // Create Journal entries
  code = generateCode();
  const code2 = generateCode();
  const { error: err4 } = await supabase.from("journal").insert([
    {
      company_id: companyId,
      code,
      amount,
      details,
      type: "dr",
    },
    {
      company_id: companyId,
      code: code2,
      amount,
      details,
      type: "cr",
    },
  ]);
  err4 && errors.push(err4.message);
  return {
    errors,
  };
};
