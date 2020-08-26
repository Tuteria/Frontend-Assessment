import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import { host } from "./../utils/environment";
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
			const res = await axios.get(`${host}/users`);
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
			const res = await axios.get(`${host}/notes`);
			if (res.data) {
				setLoading(false);
				setNotes(res.data);
			}
		} catch (error) {
			setError(true);
		}
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
			<section>
				{Users &&
					Users.map((u) => (
						<div key={u.id}>
							<p>{u.email}</p>
							<p>{u.id}</p>
						</div>
					))}
			</section>

			<section>
				{Notes &&
					Notes.map((n) => (
						<div key={n.id}>
							<p>{n.authorId}</p>
						</div>
					))}
			</section>
			<style jsx>{``}</style>
		</Layout>
	);
};

export default ProtectAdmin(Admin);
