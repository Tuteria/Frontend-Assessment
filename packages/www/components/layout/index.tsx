import Head from "next/head";
import { ReactNode } from "react";
import Header from "./header";
import Body from "./body";

const Layout = ({ children, title, content }: LayoutProps) => (
	<>
		<Head>
			<title>{title} | Notes</title>
			<link
				href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300;1,400&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap"
				rel="stylesheet"
			/>
		</Head>
		<Header title={title} aside={content.aside} />
		<Body main={content.main} aside={content.aside} />
	</>
);

export interface LayoutProps {
	children?: ReactNode;
	title: string;
	content?: {
		main: ReactNode;
		aside?: ReactNode;
	};
}

export default Layout;
