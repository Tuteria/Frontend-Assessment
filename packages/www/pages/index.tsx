import NoteList from "../components/note/list";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import Loading from "../components/loading";

export default function Home({ notes }) {
	const [list, setList] = useState(notes);

	useEffect(() => {
		async function loadData() {
			setList(await fetchAllNotes());
		}
		if (!list || list.length < 1) loadData();
	}, []);

	return (
		<Layout
			title="Home"
			content={{
				main:
					!list || list.length < 1 ? (
						<Loading />
					) : (
						<NoteList notes={list} isOwner={false} isHome={true} />
					)
			}}
		/>
	);
}

const fetchAllNotes = async () => {
	const res = await fetch(`http://localhost:8080/api/notes`);
	const json = (await res.json()).data;
	const notes: Note[] | undefined = json;

	return notes;
};

Home.getInitialProps = async ({ query, req }) =>
	req ? { notes: await fetchAllNotes() } : { notes: [] };

interface Note {
	id?: number;
	title?: string;
	description?: string;
	owner?: string;
}
