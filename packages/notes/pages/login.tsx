import React from "react";
import { GetServerSideProps } from "next";
import { LoginForm } from "../components";
import { PageContext } from "../types";

export default () => <LoginForm />;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
}: PageContext) => {
	if (req.user) {
		res.writeHead(302, {
			Location: `/users/${req.user.username}`,
		});
		res.end();
	}
	return {
		props: {},
	};
};
