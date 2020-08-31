import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/core";
import axios from "axios";
import Layout from "./../../components/Layout";
import { host } from "../../config.json";

import { Inotes } from "../index";
import { useRouter } from "next/router";

interface Iprops {
	error: string;
	data: Inotes;
}

export async function getServerSideProps({ params }) {
	try {
		const res = await axios.get(`${host}/notes/${params.id}`);
		const data = res.data;
		return {
			props: {
				data,
			},
		};
	} catch (err) {
		return {
			props: {
				error: err.message,
			},
		};
	}
}
const Note = ({ data, error }: Iprops) => {
	const toast = useToast();
	const router = useRouter();
	useEffect(() => {
		if (!data) {
			router.push("/404");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout>
			{error &&
				toast({
					title: "An error occurred.",
					description: "check your internet connection and refresh.",
					status: "error",
					duration: 7000,
					isClosable: true,
					position: "top",
				})}
			<main>
				<div className="header">
					<div>Title</div>
					<div>Description</div>
				</div>
				<ul>
					<li>{data && data.title}</li>
					<li style={{ whiteSpace: "pre-line" }}>{data && data.description}</li>
				</ul>
			</main>

			<style jsx>{`
				main {
					margin: auto;
					width: 80%;
				}
				main .header,
				ul {
					display: grid;
					grid-template-columns: 1fr 3fr;
					gap: 10px;
				}
				.header {
					font-weight: bold;
					margin-top: 10px;
					text-align: center;
					font-size: 1.4rem;
				}
				.header div {
					border-bottom: 1px solid var(--softgrey);
				}
				main ul {
					font-size: 1rem;
					margin-top: 10px;
				}
				@media only screen and (min-width: 700px) {
					main {
						margin: auto;
						width: 60%;
					}
					main ul {
						font-size: 1.2rem;
					}
				}
			`}</style>
		</Layout>
	);
};

export default Note;
