import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { AssetType, CreateCompanyState, Direction } from "@/types";

export const useCompanyStore = create<CreateCompanyState>()(
  devtools(
    persist(
      (set) => ({
        // initial state
        step: 0,
        bankBalance: "",
        cashBalance: "",
        name: "",
        description: "",
        accountNumber: "",
        telephone: "",
        email: "",
        location: "",
        facebook: "",
        twitter: "",
        youtube: "",
        landValue: "",
        vehicleValue: "",
        machineValue: "",
        assets: [],
        assetSkipped: false,
        wizardDirection: "next",
        completedSteps: {},
        // methods for manipulating state
        addAsset: (asset: AssetType) => {
          set((state) => ({
            assets: state.assets.concat(asset),
            // assets: new Set([...state.assets, asset]),
          }));
        },
        setCompletedStep: (step: number) => {
          set((state) => {
            const newCompleted = state.completedSteps;
            newCompleted[step] = true;
            return {
              completedSteps: newCompleted,
            };
          });
        },
        removeAsset: (asset: AssetType) => {
          const assetValue = `${asset}Value`;
          set((state) => ({
            assets: [...state.assets.filter((x) => x !== asset)],
            [assetValue]: "",
            // assets: new Set([...state.assets].filter((x) => x !== asset)),
          }));
        },
        resetCompanyData: () => {
          set(() => ({
            step: 0,
            bankBalance: "",
            cashBalance: "",
            name: "",
            description: "",
            accountNumber: "",
            telephone: "",
            email: "",
            location: "",
            facebook: "",
            twitter: "",
            youtube: "",
            assets: [],
            assetSkipped: false,
            landValue: "",
            vehicleValue: "",
            machineValue: "",
            wizardDirection: "next",
            completedSteps: {},
          }));
        },
        nextStep: () => {
          set((state) => ({
            step: state.step + 1,
          }));
        },
        prevStep: () => {
          set((state) => {
            const currentStep = state.step - 1;
            const completed = state.completedSteps;
            const updatedSteps = Object.keys(completed).reduce<{
              [k: number]: boolean;
            }>((acc, key) => {
              const numKey = +key;
              if (numKey > currentStep || numKey === currentStep) {
                acc[numKey] = false;
              } else {
                acc[numKey] = completed[numKey];
              }
              return acc;
            }, {});
            return {
              step: state.step - 1,
              completedSteps: updatedSteps,
            };
          });
        },
        setWizardDirection: (dir: Direction) => {
          set(() => ({
            wizardDirection: dir,
          }));
        },
        skipAssetStep: (status: boolean) => {
          set(() => ({
            assetSkipped: status,
          }));
        },
        setLandValue: (amount: string) => {
          set(() => ({
            landValue: amount,
          }));
        },
        setMachineValue: (amount: string) => {
          set(() => ({
            machineValue: amount,
          }));
        },
        setVehicleValue: (amount: string) => {
          set(() => ({
            vehicleValue: amount,
          }));
        },
        setBankBalance: (amount: string) => {
          set(() => ({
            bankBalance: amount,
          }));
        },
        setCashBalance: (amount: string) => {
          set(() => ({
            cashBalance: amount,
          }));
        },
        setName: (name: string) => {
          set(() => ({
            name,
          }));
        },
        setDescription: (desc: string) => {
          set(() => ({
            description: desc,
          }));
        },
        setAccount: (account: string) => {
          set(() => ({
            accountNumber: account,
          }));
        },
        setTelephone: (tel: string) => {
          set(() => ({
            telephone: tel,
          }));
        },
        setEmail: (email: string) => {
          set(() => ({
            email,
          }));
        },
        setLocation: (loc: string) => {
          set(() => ({
            location: loc,
          }));
        },
        setFacebook: (fb: string) => {
          set(() => ({
            facebook: fb,
          }));
        },
        setTwitter: (t: string) => {
          set(() => ({
            twitter: t,
          }));
        },
        setYoutube: (yt: string) => {
          set(() => ({
            youtube: yt,
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
