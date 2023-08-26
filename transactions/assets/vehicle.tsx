import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { AssetType, Database } from "@/types";
import { generateCode } from "@/utils";

interface Params {
  companyId: string;
  assets: AssetType[];
  vehicleValue: number;
}

// Only executed when creating a company with initial vehicle value
export const initialVehicleValue = async ({
  assets,
  companyId,
  vehicleValue,
}: Params): Promise<{
  errors: string[];
}> => {
  const errors: string[] = [];
  const supabase = createClientComponentClient<Database>();
  let code;
  if (assets.includes("vehicle")) {
    code = generateCode();
    const { error: err1 } = await supabase.from("vehicle").insert([
      {
        company_id: companyId,
        code,
        amount: vehicleValue,
        details: "Current value of the vehicle",
      },
    ]);
    err1 && errors.push(err1.message);
    code = generateCode();
    const { error: err2 } = await supabase.from("capital").insert([
      {
        company_id: companyId,
        code,
        amount: vehicleValue,
        details: "Vehicle",
      },
    ]);
    err2 && errors.push(err2.message);
    code = generateCode();
    const code2 = generateCode();
    const { error: err3 } = await supabase.from("journal").insert([
      {
        company_id: companyId,
        code,
        amount: vehicleValue,
        details: "Vehicle",
        type: "dr",
      },
      {
        company_id: companyId,
        code: code2,
        amount: vehicleValue,
        details: "Capital",
        type: "cr",
      },
    ]);
    err3 && errors.push(err3.message);
  }

  return { errors };
};
