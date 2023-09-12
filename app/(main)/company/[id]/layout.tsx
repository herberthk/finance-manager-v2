import type { FC } from "react";
import React from "react";

import Fab from "@/components/common/Fab";
import MainHeader from "@/components/common/MainHeader";
import Side from "@/components/common/Side";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <MainHeader />
      <div className="row">
        <Side />
        <div className="container">
          <div className="col s12 m9 main_margin">{children}</div>
        </div>
      </div>
      <Fab />
    </>
  );
};

export default Layout;
