export const dynamic = "force-dynamic";
import "@/styles/globals.css";
import "@/styles/materialize.css";
import "@/styles/main.scss";

import classNames from "classnames";
import { Inter } from "next/font/google";
import type { FC } from "react";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
import { headers } from "next/headers";

export const metadata = {
  title: "Finance manager",
  description: "Online financial accounting software",
};
type Props = {
  children: React.ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const company = pathname.includes("/company");
  // console.log("pathname", pathname);
  return (
    <html lang="en">
      <body
        className={classNames(inter.className, {
          main_wrapper: company,
        })}>
        {/* <CssBaseline /> */}

        {children}
      </body>
    </html>
  );
};

export default RootLayout;
