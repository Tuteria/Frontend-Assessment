import React from "react";
import { notes as Notes } from "@prisma/client";
import { GetServerSideProps } from "next";
import {
	Grid,
	ModalActivator,
	Note,
	NoteModal,
	PageProvider,
	PageContext,
} from "../components";

type Props = {
	notes: Notes[];
};

export default (props: Props) => {
	return (
		<PageProvider initialState={props}>
			<PageContext.Consumer>
				{({ state }) => (
					<React.Fragment>
						<Grid>
							{state.notes.map((note) => (
								<Note key={note.id} note={note} />
							))}
						</Grid>
						{state.isNoteModalOpen && <NoteModal />}
						<ModalActivator note={null} />
					</React.Fragment>
				)}
			</PageContext.Consumer>
		</PageProvider>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await fetch(`${process.env.API_URL}/notes`);
	if (response.ok) {
		const notes = await response.json();
		return {
			props: { notes },
		};
	} else throw new Error(response.statusText);
};
