import React from "react";
import { GetServerSideProps } from "next";
import { LoginForm } from "../components";

export default () => <LoginForm />;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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
