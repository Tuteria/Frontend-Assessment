import React from "react";
import { notes as Notes } from "@prisma/client";
import { GetServerSideProps } from "next";
import {
	Grid,
	ModalActivator,
	Note,
	NoteModal,
	usePageProvider,
} from "../components";

type Props = {
	notes: Notes[];
};

export default (props: Props) => {
	const { state } = usePageProvider();
	const { isNoteModalOpen, notes } = state;
	return (
		<React.Fragment>
			<Grid>
				{notes.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</Grid>
			<ModalActivator note={null} />
			{isNoteModalOpen && <NoteModal />}
		</React.Fragment>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/notes`
	const response = await fetch(url);
	if (response.ok) {
		const notes = await response.json();
		return {
			props: { notes },
		};
	} else throw new Error(response.statusText);
};
