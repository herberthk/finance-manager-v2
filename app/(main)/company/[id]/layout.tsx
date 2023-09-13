import type { FC } from "react";
import React, { Suspense } from "react";

import Fab from "@/components/common/Fab";
import Loader from "@/components/common/loader";
import MainHeader from "@/components/common/MainHeader";
import Side from "@/components/common/Side";

type Props = {
  children: React.ReactElement;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <MainHeader />
      <div className="row">
        <Side />
        <div className="container">
          <div className="col s12 m9 main_margin">
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </div>
        </div>
      </div>
      <Fab />
    </>
  );
};

export default Layout;
