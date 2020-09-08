import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../css/styles.css";

function App({ Component, pageProps }: AppProps): React.ReactNode {
	return (
		<ThemeProvider>
			<CSSReset />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}
export default App;
