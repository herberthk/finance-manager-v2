import M from "materialize-css";
import type { FC } from "react";
import React, { useLayoutEffect } from "react";

import type { Database } from "@/types/database.types";
import { useCompanyStore } from "@/zustand/store";

import { RightComp } from "../common/comps";
import AssetValue from "./AssetValue";
import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import HorizontalStepper from "./CreateProgress";
import Intro from "./Intro";
import OpeningBalances from "./OpeningBalances";
import Preview from "./Preview";
import SelectAssets from "./SelectAssets";
import SocialLinks from "./SocialLinks";

interface Props {
  user: Database["public"]["Tables"]["users"]["Row"];
}

const MainStep: FC<Props> = ({ user }) => {
  useLayoutEffect(() => {
    M.AutoInit();
  }, []);

  // const [logo, setLogo] = useState('');
  console.log(user);

  const step = useCompanyStore((state) => state.step);

  const steps: Record<number, React.ReactNode> = {
    0: <Intro />,
    1: <BasicInfo />,
    2: <ContactInfo />,
    3: <OpeningBalances />,
    4: <SelectAssets />,
    5: <AssetValue />,
    6: <SocialLinks />,
    7: <Preview />,
  };

  return (
    <RightComp className="hover_me">
      {step !== 0 && <HorizontalStepper />}

      {steps[step] ?? steps[0]}
    </RightComp>
  );
};

export default MainStep;
