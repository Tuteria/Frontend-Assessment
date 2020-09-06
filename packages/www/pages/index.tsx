import React from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/core";
import Link from "next/link";
import Layout from "../components/Layout";
import { nextApi } from "../utils/environment";

export interface Idata {
	id: number;
	title: string;
	description: string;
	authorId: number;
}
export interface Iprops {
	error: string;
	data: Array<Idata>;
}

export async function getServerSideProps() {
	try {
		//used nextjs api route here
		const res = await axios.get(`${nextApi}/notes`);
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
export const Home = ({ data, error }: Iprops) => {
	const toast = useToast();

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
				{data && data.length === 0 && (
					<div style={{ textAlign: "center" }}>
						No notes to display. Create one now, click the{" "}
						<span style={{ color: "lightblue" }}> "Create Note"</span> link
						above
					</div>
				)}
			</div>

			<div style={{ textAlign: "center", fontWeight: "bold" }}>All Notes</div>
			<main>
				{data &&
					data.map((d) => (
						<Link key={d.id} href={`/note/${d.id}`}>
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
export default Home;
