import { Box, Flex, Text, Skeleton } from "@chakra-ui/core";
import { mutate } from "swr";
import React, { useContext, FunctionComponent } from "react";

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

	const noteClick = (note) => {
		dispatch(setActiveNote(note));
		dispatch(setNoteView(NOTE_SINGLE_VIEW));
	};

	const editNote = (note, e) => {
		e.preventDefault();
		dispatch(setActiveNote(note));
		dispatch(setNoteView(NOTE_EDIT_VIEW));
	};

	const deleteNote = async (note) => {
		await client.delete(`/notes/${note.id}`);
		mutate(notesURI);
	};

	return (
		<Box>
			{data.map((note) => (
				<Note
					key={`${note.id}-${note.title}`}
					note={note}
					onClick={noteClick}
					handleEdit={editNote}
					handleDelete={deleteNote}
				/>
			))}
		</Box>
	);
};

export default NoteList;
