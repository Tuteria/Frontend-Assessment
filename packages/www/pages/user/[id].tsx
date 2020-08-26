import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { host } from "../../utils/environment";
import { Button, useToast } from "@chakra-ui/core";
import Link from "next/link";

export async function getServerSideProps({ params }) {
	try {
		const res = await axios.get(`${host}/users/${params.id}/notes`);
		const data = res.data.reverse();

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
export const User = ({ data, error }) => {
	const toast = useToast();
	const [user, setUser] = useState<{ id: number; email: string }>();

	useEffect(() => {
		if (data) {
			getUser();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function getUser() {
		try {
			const res = await axios.get(`${host}/users/${data[0].authorId}`);
			setUser(res.data);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<Layout>
			<>
				{error &&
					toast({
						title: "An error occurred.",
						description: "check your internet connection and refresh.",
						status: "error",
						duration: 5000,
						isClosable: true,
					})}
			</>
			<div>
				<br />
				{data.length === 0 && (
					<div style={{ textAlign: "center" }}>
						Looks like you have no notes, Create one now, click the{" "}
						<span style={{ color: "lightblue" }}> "Create Note"</span> link
						above
					</div>
				)}
			</div>

			<main>
				{user && <div>Notes for user: {user.email}</div>}
				{data &&
					data.map((d) => (
						<Link href={`/note/${d.id}`} key={d.id}>
							<a>
								<p>{d.title}</p>
							</a>
						</Link>
					))}
			</main>

			<style jsx>{`
				main {
					margin: auto;
					width: 80%;
				}

				main p {
					cursor: pointer;
					color: #333;
					background: lightblue;
					padding: 10px;
					border: 1px solid var(--softgrey);
					border-radius: 5px;
					margin: 10px 0;
				}

				main p:hover {
					transform: scale(1.01);
					transition: ease 0.2s;
				}
				main div {
					font-weight: bold;
				}

				@media only screen and (min-width: 700px) {
					main {
						margin: auto;
						width: 60%;
					}
				}
			`}</style>
		</Layout>
	);
};
export default User;
