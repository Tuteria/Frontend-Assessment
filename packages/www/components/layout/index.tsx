import Head from "next/head";
import Navbar from "./navbar";
import { ReactNode } from "react";

const Layout = ({ children }: LayoutProps) => (
  <div>
    <Head>
      <title>NextJS</title>
    </Head>
    <Navbar />
    {children}
  </div>
);

export interface LayoutProps {
  children?: ReactNode;
}

export default Layout;
