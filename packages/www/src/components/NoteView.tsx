import { useContext, FunctionComponent } from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/core";

import { storeContext, setNoteView } from "../store";
import { NOTE_LIST_VIEW, NOTE_EDIT_VIEW } from "../store/constants";

interface NoteFormProps {
	note?: INote;
}

const NoteForm: FunctionComponent<NoteFormProps> = ({ note }) => {
	const { dispatch } = useContext(storeContext);
	return (
		<Box>
			<Text
				fontSize={["2xl", "2xl", "3xl"]}
				p={[2, 4, 6]}
				placeholder="Note Title"
				bg="#fff"
				mt="0"
				mb="2"
			>
				{note.title}
			</Text>
			<Text
				fontSize={["md", "xl", "xl"]}
				boxSizing="border-box"
				height="50vh"
				bg="#fff"
				p="2"
				mb="3"
			>
				{note.description}
			</Text>
			<Flex>
				<Button
					onClick={() => dispatch(setNoteView(NOTE_EDIT_VIEW))}
					type="submit"
					color="#fc5c9c"
					border="0"
					mr="2"
				>
					Edit
				</Button>
				<Button
					onClick={() => dispatch(setNoteView(NOTE_LIST_VIEW))}
					color="grey"
					border="0"
				>
					View Notes
				</Button>
			</Flex>
		</Box>
	);
};

export default NoteForm;
