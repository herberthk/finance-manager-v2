import type { AssetType, CompanyType, Direction } from ".";

export interface CreateCompanyState {
  step: number;
  bankBalance: number;
  cashBalance: number;
  landValue: number;
  machineValue: number;
  vehicleValue: number;
  name: string;
  description: string;
  accountNumber?: string;
  telephone?: string;
  email?: string;
  location?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  assets: AssetType[];
  assetSkipped: boolean;
  wizardDirection: Direction;
  completedSteps: { [k: number]: boolean };
  setCompletedStep: (k: number) => void;
  setWizardDirection: (dir: Direction) => void;
  skipAssetStep: (state: boolean) => void;
  addAsset: (asset: AssetType) => void;
  removeAsset: (asset: AssetType) => void;
  resetProgressData: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setBankBalance: (amount: string) => void;
  setCashBalance: (amount: string) => void;
  setLandValue: (amount: string) => void;
  setMachineValue: (amount: string) => void;
  setVehicleValue: (amount: string) => void;
  setName: (name: string) => void;
  setDescription: (desc: string) => void;
  setAccount: (account: string) => void;
  setTelephone: (tel: string) => void;
  setEmail: (email: string) => void;
  setLocation: (loc: string) => void;
  setFacebook: (fb: string) => void;
  setTwitter: (t: string) => void;
  setYoutube: (yt: string) => void;
}

export interface CompanyState {
  company: CompanyType | null;
  setCompany: (company: CompanyType) => void;
  resetCompany: () => void;
}
