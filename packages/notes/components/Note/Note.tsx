import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/core";
import ModalActivator from "../NoteModal/ModalActivator";
import DeleteBtn from "./DeleteNoteBtn";
import { NoteProps as Props } from "../../types";
import { truncateText } from "../../utils";


const Note: React.FC<Props> = ({ note }: Props) => (
	<Box
		p="10px"
		shadow="0px 1px 5px 0px rgba(0,0,0,0.25)"
		borderRadius="5px"
		width="100%"
		maxWidth="300px"
	>
		<Flex maxHeight="120px" my="10px" justify="space-between">
			<Link as="b" textDecoration="underline" href={`/notes/${note.id}`}>
				{truncateText(note.title, 20, "Untitled")}
			</Link>
			<Flex>
				<ModalActivator note={note} />
				<DeleteBtn note={note} />
			</Flex>
		</Flex>
		<Box>
			<Text as="p">{truncateText(note.description, 150, "...")}</Text>
		</Box>
		<Box>
			<b>written by: </b>
			{truncateText(note.author, 15, "Anonymous")}
		</Box>
	</Box>
);

export default Note;
