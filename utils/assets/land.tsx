import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { AssetType, Database } from "@/types";
import { generateCode } from "@/utils/helpers";

interface Params {
  companyId: string;
  assets: AssetType[];
  landValue: number;
}
export const manageLand = async ({
  assets,
  companyId,
  landValue,
}: Params): Promise<{
  errors: string[];
}> => {
  const errors: string[] = [];
  const supabase = createClientComponentClient<Database>();

  if (assets.includes("land")) {
    const code = generateCode();
    const { error: err1 } = await supabase.from("land").insert([
      {
        company_id: companyId,
        code,
        amount: landValue,
        details: "Current value of the land",
      },
    ]);
    err1 && errors.push(err1.message);
    const { error: err2 } = await supabase.from("capital").insert([
      {
        company_id: companyId,
        code,
        amount: landValue,
        details: "Land",
      },
    ]);
    err2 && errors.push(err2.message);

    const { error: err3 } = await supabase.from("journal").insert([
      {
        company_id: companyId,
        code,
        amount: landValue,
        details: "Land",
        type: "dr",
      },
      {
        company_id: companyId,
        code,
        amount: landValue,
        details: "Capital",
        type: "cr",
      },
    ]);
    err3 && errors.push(err3.message);
  }

  return { errors };
};
