import { FunctionComponent } from "react";
import { Flex, Text, IconButton } from "@chakra-ui/core";

interface NoteProps {
	note: INote;
	handleEdit?: (n: INote, e) => void;
	handleDelete?: (n: INote, e) => void;
	onClick?: (n: INote) => void;
	isDeleting?: { state: boolean; noteId: number };
}

const Note: FunctionComponent<NoteProps> = ({
	note,
	handleEdit,
	handleDelete,
	onClick,
	isDeleting,
}) => (
	<Flex
		key={`${note.id}-${note.title}`}
		width="100%"
		bg="#f5f5f5"
		p="1"
		mb="2"
		borderRadius="5px"
		alignItems="center"
		justifyContent="space-between"
	>
		<Text
			onClick={() => onClick(note)}
			color="#fc5c9c"
			fontSize={["1em", "1.2em"]}
			textTransform="capitalize"
			cursor="pointer"
		>
			{note.title || "[No Title]"}
		</Text>
		<Flex>
			<IconButton
				onClick={(e) => handleEdit(note, e)}
				aria-label="edit note"
				icon="edit"
				border="0"
				mr="1"
			/>
			<IconButton
				isLoading={isDeleting.state}
				onClick={(e) => handleDelete(note, e)}
				aria-label="delete note"
				icon="delete"
				border="0"
			/>
		</Flex>
	</Flex>
);

export default Note;
