import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { AssetType, Database } from "@/types";
import { generateCode } from "@/utils";

interface Params {
  companyId: string;
  assets: AssetType[];
  machineValue: number;
}

// Only executed when creating a company with initial machine value
export const initialMachineTransaction = async ({
  assets,
  companyId,
  machineValue,
}: Params): Promise<{
  errors: string[];
}> => {
  const errors: string[] = [];
  const supabase = createClientComponentClient<Database>();
  let code;
  if (assets.includes("machine")) {
    code = generateCode();
    const { error: err1 } = await supabase.from("machine").insert([
      {
        company_id: companyId,
        code,
        amount: machineValue,
        details: "Current value of the machine",
      },
    ]);
    err1 && errors.push(err1.message);
    code = generateCode();
    const { error: err2 } = await supabase.from("capital").insert([
      {
        company_id: companyId,
        code,
        amount: machineValue,
        details: "Machine",
      },
    ]);
    err2 && errors.push(err2.message);
    code = generateCode();
    const code2 = generateCode();
    const { error: err3 } = await supabase.from("journal").insert([
      {
        company_id: companyId,
        code,
        amount: machineValue,
        details: "Machine",
        type: "dr",
      },
      {
        company_id: companyId,
        code: code2,
        amount: machineValue,
        details: "Capital",
        type: "cr",
      },
    ]);
    err3 && errors.push(err3.message);
  }

  return { errors };
};
