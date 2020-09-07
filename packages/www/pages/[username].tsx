import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NoteList from "../components/note/list";
import Create from "../components/note/create";
import Layout from "../components/layout";
import Loading from "../components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
		<Layout
			title={`${router.query.username}'s Notes`}
			content={{
				aside: (
					<div className="p-4 text-dark">
						<h4>{`Notes from ${router.query.username}`}</h4>
					</div>
				),
				main:
					!list || list.length < 1 ? (
						<Loading />
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
					),
			}}
		></Layout>
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
