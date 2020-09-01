import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import { host } from "../../../config.json";
import { Button, useToast } from "@chakra-ui/core";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import { Iprops } from "../../index";
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
	try {
		const res = await axios.get(`${host}/users/${params.username}/notes`);
		const notes = res.data.reverse();
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

export const User = ({ notes, error }: Iprops) => {
	const toast = useToast();
	const router = useRouter();
	const [user, setUser] = useState<{
		id: number;
		email: string;
		username: string;
		bio: string;
	}>();

	useEffect(() => {
		if (notes && notes.length > 0) {
			getUser();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//gets user email
	async function getUser() {
		try {
			const res = await axios.get(`${host}/users/${notes[0]?.username}`);
			setUser(res.data);
		} catch (err) {
			console.log(err);
		}
	}

	//gets logged in user
	const [userId, setUserId] = useState();
	useEffect(() => {
		try {
			const token = jwtDecode(localStorage.getItem("tuteria"));
			if (token) {
				setUserId(token.user_id);
			}
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	async function handleDelete(id: number) {
		if (window.confirm("Are you sure you want to Delete this note?")) {
			try {
				const res = await axios.delete(`${host}/notes/${id}`);
				if (res.data) {
					router.reload();
				}
			} catch (error) {
				console.log(error.message);
			}
		}
	}

	if (typeof window === "object") {
		if (!localStorage.getItem("tuteria"))
			return "redirecting, please sign in...";
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
				{notes && notes.length === 0 && (
					<div style={{ textAlign: "center" }}>
						Looks like you have no notes, Create one now, click the{" "}
						<span style={{ color: "lightblue" }}> "Create Note"</span> link
						above
					</div>
				)}
			</div>

			<main>
				{user && <div>Notes for user: {user.email}</div>}
				{notes &&
					notes.map((d) => (
						<div className="user_notes" key={d.id}>
							<p>
								<Link href={`/note/${d.id}`} as={`/note/${d.id}`}>
									<a>{d.title}</a>
								</Link>
							</p>
							<Button
								style={{
									display: user && user.id === userId ? "flex" : "none",
								}}
								size="sm"
								variantColor="red"
								marginLeft="5"
								marginRight="5"
								onClick={() => {
									handleDelete(d.id);
								}}
							>
								Delete
							</Button>
							<Button
								size="sm"
								variantColor="blue"
								style={{
									display: user && user.id === userId ? "flex" : "none",
								}}
							>
								<Link
									href={`/notes/${d.id}/update`}
									as={`/notes/${d.id}/update`}
								>
									<a>Update</a>
								</Link>
							</Button>
						</div>
					))}
			</main>

			<style jsx>{`
				main {
					margin: auto;
					width: 80%;
				}
				main div:first-child {
					margin-bottom: 10px;
				}
				main p {
					cursor: pointer;
					color: #333;
					background: lightblue;
					padding: 5px;
					border: 1px solid var(--softgrey);
					border-radius: 5px;
					width: 100%;
				}
				main p:hover {
					transform: scale(1.01);
					transition: ease 0.2s;
				}
				main div {
					font-weight: bold;
				}
				.user_notes {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 5px;
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
