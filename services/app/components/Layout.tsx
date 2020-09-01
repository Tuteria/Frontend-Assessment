import Head from "next/head";
import React from "react";
import Header from "./Header";

export default function Layout({ children }) {
	return (
		<div>
			<Head>
				<title>Notes App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<Header />
				{children}
			</div>
		</div>
	);
}
