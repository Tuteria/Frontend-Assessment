import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import { host } from "../../../config.json";
import { Button, useToast } from "@chakra-ui/core";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import { Iprops } from "../../index";
import { useRouter } from "next/router";
import cookies from "react-cookies";

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

export const User = ({ notes, error, authToken, currentUser }) => {
	const toast = useToast();
	const router = useRouter();
	const [user, setUser] = useState<{
		id: number;
		email: string;
		username: string;
		bio: string;
	}>();

	async function handleDelete(id: number) {
		if (window.confirm("Are you sure you want to Delete this note?")) {
			try {
				const instance = axios.create({
					withCredentials: true,
				});
				const config = {
					headers: {
						"Content-Type": "application/json",
						authorization: `bearer ${authToken}`,
					},
				};
				const res = await instance.delete(`${host}/notes/${id}`, config);
				if (res.data) {
					router.reload();
				}
			} catch (error) {
				console.log(error.message);
			}
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
				<div>
					{notes &&
						notes.map((d) => (
							<div className="user_notes" key={d.id}>
								<p className="user_note">
									<Link href={`/notes/${d.id}`} key={d.id}>
										<a className="note-item">
											<p>{d.title}</p>

											<div className="note-meta">
												<small className="note-item-username">
													{d.username}
												</small>
												{user && user.id === currentUser.id ? (
													<>
														<small>
															<a
																className="delete-note"
																onClick={() => {
																	handleDelete(d.id);
																}}
															>
																Delete
															</a>
														</small>
														<Link
															href={`/notes/${d.id}/update`}
															as={`/notes/${d.id}/update`}
														>
															<a className="update-note">
																<small>Update</small>
															</a>
														</Link>{" "}
													</>
												) : null}
											</div>
										</a>
									</Link>
								</p>
							</div>
						))}
				</div>
			</main>

			<style jsx>{`
				main {
					margin: auto;
					width: 80%;
				}
				.note-meta {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.note-item-username,
				.delete-note,
				.update-note {
					display: block;
					font-style: italic;
					font-weight: normal;
					text-decoration: underline;
				}
				.delete-note,
				.update-note {
					align-self: flex-end;
				}
				.delete-note {
					color: red;
				}

				.update-note {
					color: green;
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
export default User;
