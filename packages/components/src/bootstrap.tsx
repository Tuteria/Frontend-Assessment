import * as React from "react";
import { FunctionComponent } from "react";
import theme from "./theme";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

const ZetaProvider: FunctionComponent = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<CSSReset />
			{children}
		</ThemeProvider>
	);
};
export default ZetaProvider;
