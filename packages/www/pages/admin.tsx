import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import { nextApi } from "./../utils/environment";
import axios from "axios";
import { Spinner, useToast } from "@chakra-ui/core";
import { ProtectAdmin } from "./../ProtectAdmin";

export const Admin = () => {
	const toast = useToast();
	const [Users, setUsers] = useState([]);
	const [Notes, setNotes] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchNotes();
		fetchUsers();
	}, []);

	async function fetchUsers() {
		try {
			const res = await axios.get(`${nextApi}/users`);
			if (res.data) {
				setLoading(false);
				setUsers(res.data);
			}
		} catch (error) {
			setError(true);
		}
	}

	async function fetchNotes() {
		try {
			const res = await axios.get(`${nextApi}/notes`);
			if (res.data) {
				setLoading(false);
				setNotes(res.data);
			}
		} catch (error) {
			setError(true);
		}
	}

	function mapNotesToUsers(id: number): number {
		const Note = Notes.filter((n) => n.authorId === id);
		return Note.length;
	}
	return (
		<Layout>
			<>
				{loading && (
					<div className="spinner">
						<Spinner speed="1s"></Spinner>
					</div>
				)}
			</>
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
			<main>
				<section className="admin-table-header">
					<h1>User Email</h1>
					<h1>User ID</h1>
					<h1>No Of Notes</h1>
				</section>
				<section>
					{Users &&
						Users.map((u) => (
							<div key={u.id} className="admin-table-body">
								<p>{u.email}</p>
								<p>{u.id}</p>
								<p>{mapNotesToUsers(u.id)}</p>
							</div>
						))}
				</section>
			</main>
			<style jsx>{`
				main {
					margin: auto;
					width: 80%;
					padding-top: 20px;
				}
				.admin-table-header,
				.admin-table-body {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
					gap: 10px;
					text-align: center;
					place-items: center;
				}
				.admin-table-header {
					border-bottom: 1px solid var(--softgrey);
				}
				.admin-table-header h1 {
					font-weight: bold;
				}

				.admin-table-body p {
					word-wrap: break-word;
					width: 100px;
				}
				@media only screen and (min-width: 700px) {
					main {
						margin: auto;
						width: 60%;
					}

					.admin-table-header h1 {
						font-size: 1.1rem;
					}

					.admin-table-body p {
						width: 100%;
						padding: 5px 0;
					}
				}
			`}</style>
		</Layout>
	);
};

export default ProtectAdmin(Admin);
