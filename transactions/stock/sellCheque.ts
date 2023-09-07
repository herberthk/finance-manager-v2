import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/types";
import { generateCode } from "@/utils";

type Params = {
  companyId: string;
  quantity: number;
  itemName: string;
  sellingPrice: number;
};

export const sellStockWithCheque = async ({
  companyId,
  itemName,
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
      amount: sellingPrice * quantity,
      details: itemName,
    },
  ]);

  err1 && errors.push(err1.message);
  // Create cashbook entry
  code = generateCode();
  const { error: err2 } = await supabase.from("cashbook").insert([
    {
      company_id: companyId,
      code,
      cash: sellingPrice * quantity,
      details: `Sold ${quantity} ${itemName} with cheque`,
    },
  ]);
  err2 && errors.push(err2.message);
  // Increment quantity of sold stock
  const { error: err3 } = await supabase.rpc("increment_sold_stock", {
    company_id: companyId,
    item: itemName,
    quantity,
  });

  err3 && errors.push(err3.message);

  // Create sales account entry
  code = generateCode();
  const { error } = await supabase.from("sales").insert([
    {
      company_id: companyId,
      code,
      amount: sellingPrice * quantity,
      details: `Sold ${quantity} ${itemName} with cheque`,
    },
  ]);

  error && errors.push(error.message);
  // Create Journal entries
  code = generateCode();
  const code2 = generateCode();
  const { error: err4 } = await supabase.from("journal").insert([
    {
      company_id: companyId,
      code,
      amount: sellingPrice * quantity,
      details: `Sold ${quantity} ${itemName} with cheque`,
      type: "dr",
    },
    {
      company_id: companyId,
      code: code2,
      amount: sellingPrice * quantity,
      details: `Sold ${quantity} ${itemName} with cheque`,
      type: "cr",
    },
  ]);
  err4 && errors.push(err4.message);
  return {
    errors,
  };
};
