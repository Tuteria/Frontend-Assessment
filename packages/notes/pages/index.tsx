import React from "react";
import { notes as Note } from "@prisma/client";
import { GetServerSideProps } from "next";

type Props = {
	notes: Note[];
};

export default ({ notes }: Props) => {
	return (
		<ul>
			{notes.map(({ id, title }) => (
				<li key={id}>{title}</li>
			))}
		</ul>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await fetch(`${process.env.API_URL}/notes`);
	if (response.ok) {
		const notes = await response.json();
		return {
			props: { notes },
		};
	} else throw new Error(response.statusText);
};
