import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import NextApp, { AppProps } from "next/app";
import Head from "next/head";
import { Header, Main, PageProvider } from "../components";
import { AppContext } from "../types";
import "../styles/main.css";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<React.Fragment>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<ThemeProvider>
				<PageProvider initialState={pageProps}>
					<Header />
					<Main>
						<Component {...pageProps} />
					</Main>
				</PageProvider>
			</ThemeProvider>
		</React.Fragment>
	);
};

App.getInitialProps = async (appContext: AppContext) => {
	const props = await NextApp.getInitialProps(appContext);
	return {
		pageProps: { ...props, user: appContext.ctx?.req?.user },
	};
};

export default App;
