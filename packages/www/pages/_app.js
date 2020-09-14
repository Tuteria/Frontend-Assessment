import '../utils/styles.css';
import Cookie from "js-cookie";
import {CSSReset, ThemeProvider} from "@chakra-ui/core";
import AuthContext from "../utils/auth";
import React from "react";


export default function MyApp({ Component, pageProps }) {
	const authenticatedUsername = Cookie.get('USERNAME_COOKIE');
	const isAdmin = Cookie.get('ADMIN_COOKIE');

	return (
		<AuthContext.Provider
			value={{isAdmin, authenticatedUsername}}
		>
			<ThemeProvider>
				<CSSReset />
				<Component {...pageProps} />
			</ThemeProvider>
		</AuthContext.Provider>
	)
}
