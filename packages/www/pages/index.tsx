import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/core";
import Link from "next/link";
import { host } from "../config.json";
import Layout from "../components/Layout";

export interface Inotes {
	id: number;
	title: string;
	description: string;
	username: string;
}
export interface Iprops {
	error: string;
	notes: Array<Inotes>;
}

export async function getServerSideProps() {
	try {
		const res = await axios.get(`${host}/notes`);
		const notes = res.data.reverse();
		console.log(notes);
		return {
			props: {
				notes,
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
export const Home = ({ notes, error }: Iprops) => {
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
				{notes && notes.length === 0 && (
					<div style={{ textAlign: "center" }}>
						No notes to display. Create one now, click the{" "}
						<span style={{ color: "lightblue" }}> "Create Note"</span> link
						above
					</div>
				)}
			</div>

			<main>
				{notes &&
					notes.map((d) => (
						<Link href={`/note/${d.id}`} key={d.id}>
							<a className="note-item">
								<p>{d.title}</p>
								<small className="note-item-username">{d.username}</small>
							</a>
						</Link>
					))}
			</main>

			<style jsx>{`
				main {
					margin: auto;
					width: 80%;
				}
				.note-item-username {
					display: block;
					font-style: italic;
					font-weight: normal;
					text-decoration: underline;
				}
				.note-item {
					cursor: pointer;
					display: block;
					padding: 1rem;
					background: lightgray;
					border-radius: 10px;
					padding: 10px;
					border: 1px solid var(--softgrey);
					border-radius: 5px;
					margin: 10px 0;
					transition: ease 0.2s;
				}
				.note-item:hover {
					transform: scale(1.01);
					background: var(--softgrey);
				}
				main div {
					font-weight: bold;
				}
				@media only screen and (min-width: 700px) {
					main {
						margin: auto;
						width: 60%;
						display: grid;
						justify-content: stretch;
						align-content: stretch;
						grid-gap: 1rem;
						grid-template-columns: repeat(4, 1fr);
						grid-auto-rows: max-content;
					}
					.note-item {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						height: 100%;
					}
				}
			`}</style>
		</Layout>
	);
};
export default Home;
