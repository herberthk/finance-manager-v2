import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/types";
import { generateCode } from "@/utils";

type Params = {
  companyId: string;
  price: number;
  quantity: number;
  itemName: string;
  sellingPrice: number;
};

export const buyStockWithCheque = async ({
  companyId,
  itemName,
  price,
  quantity,
  sellingPrice,
}: Params): Promise<{ errors: string[] }> => {
  const errors: string[] = [];
  const supabase = createClientComponentClient<Database>();
  let code;
  code = generateCode();
  // Create entry in cash account
  const { error: err1 } = await supabase.from("bank").insert([
    {
      company_id: companyId,
      code,
      amount: price * quantity,
      details: itemName,
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
      cash: price * quantity,
      details: `Purchased ${quantity} ${itemName} with cheque`,
      type: "cr",
    },
  ]);
  err2 && errors.push(err2.message);
  // Create expense entry
  code = generateCode();
  const { error: err3 } = await supabase.from("stock").insert([
    {
      company_id: companyId,
      code,
      price,
      quantity,
      selling_price: sellingPrice,
      item: itemName,
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
      amount: price * quantity,
      details: itemName,
      type: "dr",
    },
    {
      company_id: companyId,
      code: code2,
      amount: price * quantity,
      details: itemName,
      type: "cr",
    },
  ]);
  err4 && errors.push(err4.message);
  return {
    errors,
  };
};
