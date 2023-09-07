export const dynamic = "force-dynamic";
import "@/styles/globals.css";
import "@/styles/materialize.css";
import "@/styles/main.scss";

import { Inter } from "next/font/google";
import type { FC } from "react";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finance manager",
  description: "Online financial accounting software",
};
type Props = {
  children: React.ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <CssBaseline /> */}

        {children}
      </body>
    </html>
  );
};

export default RootLayout;
