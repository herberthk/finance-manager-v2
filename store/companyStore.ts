import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { CompanyState, CompanyType } from "@/types";

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
        setCompany: (company: CompanyType) => {
          set(() => ({
            company: company,
          }));
        },
      }),
      {
        name: "company-information",
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      },
    ),
  ),
);
