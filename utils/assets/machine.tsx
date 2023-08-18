import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { AssetType, Database } from "@/types";
import { generateCode } from "@/utils/helpers";

interface Params {
  companyId: string;
  assets: AssetType[];
  machineValue: number;
}
export const manageMachine = async ({
  assets,
  companyId,
  machineValue,
}: Params): Promise<{
  errors: string[];
}> => {
  const errors: string[] = [];
  const supabase = createClientComponentClient<Database>();

  if (assets.includes("machine")) {
    const code = generateCode();
    const { error: err1 } = await supabase.from("machine").insert([
      {
        company_id: companyId,
        code,
        amount: machineValue,
        details: "Current value of the machine",
      },
    ]);
    err1 && errors.push(err1.message);
    const { error: err2 } = await supabase.from("capital").insert([
      {
        company_id: companyId,
        code,
        amount: machineValue,
        details: "Machine",
      },
    ]);
    err2 && errors.push(err2.message);

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
        code,
        amount: machineValue,
        details: "Capital",
        type: "cr",
      },
    ]);
    err3 && errors.push(err3.message);
  }

  return { errors };
};
