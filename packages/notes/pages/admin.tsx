import React from "react";
import { GetServerSideProps } from "next";
import { Grid, User, usePageProvider } from "../components";

export default () => {
	const {
		state: { users },
	} = usePageProvider();

	return (
		<React.Fragment>
			<Grid>
				{users.map((user) => (
					<User key={user.id} user={user} />
				))}
			</Grid>
		</React.Fragment>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	if (!req.user || !req.user.admin) {
		res
			.writeHead(302, {
				Location: "/",
			})
			.end();
	}
	const url = `${process.env.API_URL}/users`;
	const response = await fetch(url, {
		headers: { cookie: req.headers.cookie },
	});

	if (response.ok) {
		const users = await response.json();
		return {
			props: { users },
		};
	}
	throw new Error(response.statusText);
};
