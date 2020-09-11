import { Box, Flex, Text, Skeleton } from "@chakra-ui/core";
import { mutate } from "swr";
import React, { useContext, FunctionComponent, useState } from "react";

import { storeContext, setActiveNote, setNoteView } from "../../store";
import Note from "./Note";
import client from "../../api/client";
import { useFetcher } from "../../hooks";
import { NOTE_EDIT_VIEW, NOTE_SINGLE_VIEW } from "../../store/constants";

interface NoteListProps {
	notesURI?: string;
}

const NoteList: FunctionComponent<NoteListProps> = ({
	notesURI = "/notes",
}) => {
	const { dispatch } = useContext(storeContext);
	const { data, error } = useFetcher(notesURI);
	const [isDeleting, setIsDeleting] = useState({ state: false, noteId: null });

	if (error) {
		return <Box>There was an error while fetching notes</Box>;
	}

	if (!data && notesURI !== null) {
		return (
			<Flex mt="8" flexDirection="column">
				<Skeleton height="3rem" my="10px" />
				<Skeleton height="3rem" my="10px" />
			</Flex>
		);
	}

	if (data?.length < 1 || notesURI === null) {
		return (
			<Flex>
				<Text color="grey" fontSize="lg">
					No notes
				</Text>
			</Flex>
		);
	}

	const noteClick = (note: INote) => {
		dispatch(setActiveNote(note));
		dispatch(setNoteView(NOTE_SINGLE_VIEW));
	};

	const editNote = (note: INote, e: any) => {
		e.preventDefault();
		dispatch(setActiveNote(note));
		dispatch(setNoteView(NOTE_EDIT_VIEW));
	};

	const deleteNote = async (note: INote) => {
		setIsDeleting({ noteId: note.id, state: true });
		try {
			await client.delete(`/notes/${note.id}`);
			mutate(notesURI);
		} catch (err) {
			setIsDeleting({ noteId: note.id, state: false });
		}
	};

	return (
		<Box>
			{data.map((note: INote) => (
				<Note
					key={`${note.id}-${note.title}`}
					note={note}
					onClick={noteClick}
					handleEdit={editNote}
					isDeleting={note.id === isDeleting.noteId && isDeleting}
					handleDelete={deleteNote}
				/>
			))}
		</Box>
	);
};

export default NoteList;
