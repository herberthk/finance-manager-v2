import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/types";
import { generateCode } from "@/utils";

type Params = {
  companyId: string;
  amount: number;
  name: string;
};

export const buyMachineByCash = async ({
  amount,
  companyId,
  name,
}: Params): Promise<{ errors: string[] }> => {
  const errors: string[] = [];
  const supabase = createClientComponentClient<Database>();
  let code;
  code = generateCode();
  // Create entry in cash account
  const { error: err1 } = await supabase.from("cash").insert([
    {
      company_id: companyId,
      code,
      amount,
      details: name,
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
      cash: amount,
      details: `Paid ${name} by cash`,
      type: "cr",
    },
  ]);
  err2 && errors.push(err2.message);
  // Create expense entry
  code = generateCode();
  const { error: err3 } = await supabase.from("machine").insert([
    {
      company_id: companyId,
      code,
      amount,
      details: name,
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
      details: name,
      type: "dr",
    },
    {
      company_id: companyId,
      code: code2,
      amount,
      details: "Cash",
      type: "cr",
    },
  ]);
  err4 && errors.push(err4.message);
  return {
    errors,
  };
};
