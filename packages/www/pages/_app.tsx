import "../styles/app.css";
import type { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import cookies from "next-cookies";
import { adminToken } from "../config.json";
import Router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<CSSReset />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

// This is very different from getServerSideProps
// Always gets called when a page is requested
// We can do redirect, push to another plase,
// Authentication middleware, whatever!!!
MyApp.getInitialProps = async function (context) {
	const { Component } = context;

	const { pathname, res } = context.ctx || { res: {} };

	const { isAdmin, isAdminToken, authToken, currentUser } = cookies(
		context.ctx
	);

	if (["admin", "/user/[username]", "/notes/create"].includes(pathname)) {
		const isLoginPath = ["/login", "/admin/login"].includes(pathname);
		const adminAuthorized = isAdmin && isAdminToken === adminToken;
		const isUserAuthRoutes: boolean = [
			"user/[username]",
			"/notes/create",
		].includes(pathname);
		if (!isUserAuthRoutes && !adminAuthorized && !isLoginPath) {
			typeof window !== "undefined"
				? Router.push("/admin/login")
				: res.writeHead(302, { Location: "/admin/login" }).end();
		} else if (isLoginPath && adminAuthorized) {
			typeof window !== "undefined"
				? Router.push("/admin")
				: res.writeHead(302, { Location: "/admin" }).end();
		} else if (!authToken && isUserAuthRoutes && !isLoginPath) {
			typeof window !== "undefined"
				? Router.push("/login")
				: res.writeHead(302, { Location: "/login" }).end();
		}
	}

	let pageProps = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps();
	}

	return {
		pageProps: {
			...pageProps,
			authToken,
			currentUser,
		},
	};
};

export default MyApp;
