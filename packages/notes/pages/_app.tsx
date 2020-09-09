import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	return (
		<React.Fragment>
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</React.Fragment>
	);
};

export default App;
