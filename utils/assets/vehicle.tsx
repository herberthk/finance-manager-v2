import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { AssetType, Database } from "@/types";
import { generateCode } from "@/utils/helpers";

interface Params {
  companyId: string;
  assets: AssetType[];
  vehicleValue: number;
}
export const manageVehicle = async ({
  assets,
  companyId,
  vehicleValue,
}: Params): Promise<{
  errors: string[];
}> => {
  const errors: string[] = [];
  const supabase = createClientComponentClient<Database>();
  if (assets.includes("vehicle")) {
    const code = generateCode();
    const { error: err1 } = await supabase.from("vehicle").insert([
      {
        company_id: companyId,
        code,
        amount: vehicleValue,
        details: "Current value of the vehicle",
      },
    ]);
    err1 && errors.push(err1.message);
    const { error: err2 } = await supabase.from("capital").insert([
      {
        company_id: companyId,
        code,
        amount: vehicleValue,
        details: "Vehicle",
      },
    ]);
    err2 && errors.push(err2.message);

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
        code,
        amount: vehicleValue,
        details: "Capital",
        type: "cr",
      },
    ]);
    err3 && errors.push(err3.message);
  }

  return { errors };
};
