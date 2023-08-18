import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Company, CompanyState } from "@/types";

export const useCompanyStore = create<CompanyState>()(
  devtools(
    persist(
      (set) => ({
        // initial state
        company: null,
        // methods for manipulating state
        resetCompany: () => {
          set(() => ({
            company: null,
          }));
        },
        setCompany: (company: Company) => {
          set(() => ({
            company: company,
          }));
        },
      }),
      {
        name: "company-registration",
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      },
    ),
  ),
);
