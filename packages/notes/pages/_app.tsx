import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";
import Head from "next/head";
import { Header, Footer } from "../components";
import "../styles/main.css";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	return (
		<React.Fragment>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<ThemeProvider>
				<Header />
				<Component {...pageProps} />
				<Footer />
			</ThemeProvider>
		</React.Fragment>
	);
};

export default App;
