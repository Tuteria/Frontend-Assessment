import Head from "next/head";
import { ReactNode } from "react";
import Header from "./header";

const Layout = ({ children, title }: LayoutProps) => (
	<div>
		<Head>
			<title>{title} | Notes</title>
		</Head>
		<Header />
		{children}
	</div>
);

export interface LayoutProps {
	children?: ReactNode;
	title: string;
}

export default Layout;
