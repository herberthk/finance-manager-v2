import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { AssetType, Database } from "@/types";
import { generateCode } from "@/utils";

interface Params {
  companyId: string;
  assets: AssetType[];
  landValue: number;
}

// Only executed when creating a company with initial land value
export const initialLandTransaction = async ({
  assets,
  companyId,
  landValue,
}: Params): Promise<{
  errors: string[];
}> => {
  const errors: string[] = [];
  const supabase = createClientComponentClient<Database>();
  let code;
  if (assets.includes("land")) {
    code = generateCode();
    const { error: err1 } = await supabase.from("land").insert([
      {
        company_id: companyId,
        code,
        amount: landValue,
        details: "Current value of the land",
      },
    ]);
    err1 && errors.push(err1.message);
    code = generateCode();
    const { error: err2 } = await supabase.from("capital").insert([
      {
        company_id: companyId,
        code,
        amount: landValue,
        details: "Land",
      },
    ]);
    err2 && errors.push(err2.message);
    code = generateCode();
    const code2 = generateCode();
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
        code: code2,
        amount: landValue,
        details: "Capital",
        type: "cr",
      },
    ]);
    err3 && errors.push(err3.message);
  }

  return { errors };
};

// export const buyLand = async () => {};
