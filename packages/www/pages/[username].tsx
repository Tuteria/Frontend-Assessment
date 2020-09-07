import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NoteList from "../components/note/list";
import Create from "../components/note/create";
import Link from "next/link";

export default function User({ notes }) {
	const router = useRouter();
	const [list, setList] = useState(notes);

	useEffect(() => {
		async function loadData() {
			setList(await fetchUserNotes(router.query.username));
		}
		if (!list || list.length < 1) loadData();
	}, []);

	return (
		<>
			<p>
				<Link href="/" as="/">
					<a>Home</a>
				</Link>
			</p>
			{!list || list.length < 1 ? (
				<div>loading notes...</div>
			) : (
				<>
					<NoteList
						username={router.query.username}
						notes={list}
						isHome={false}
						isOwner={true}
					/>
					<Create
						owner={router.query.username}
						updateNote={(n) => setList(n)}
					/>
				</>
			)}
		</>
	);
}

const fetchUserNotes = async (username) => {
	const res = await fetch(`http://localhost:8080/api/users/${username}/notes`);
	const json = (await res.json()).data;
	const notes: Note[] | undefined = json;

	return notes;
};

User.getInitialProps = async ({ query, req }) =>
	req ? { notes: await fetchUserNotes(query.username) } : { notes: [] };

interface Note {
	id?: number;
	title?: string;
	description?: string;
	owner?: string;
}
