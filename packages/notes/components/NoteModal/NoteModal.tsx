import React from "react";
import {
	Button,
	Box,
	Input,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalOverlay,
	Textarea,
} from "@chakra-ui/core";
import { usePageProvider } from "../PageProvider";

export default () => {
	const { state, dispatch } = usePageProvider();
	const { selectedNote, isNoteModalOpen } = state;
	const defaultTitle = selectedNote ? selectedNote.title : "";
	const defaultDesc = selectedNote ? selectedNote.description : "";
	const [title, setTitle] = React.useState(defaultTitle);
	const [description, setDescription] = React.useState(defaultDesc);
	const [isLoading, setLoading] = React.useState(false);
	const handleTitleChange = (e) => setTitle(e.target.value);
	const handleDescriptionChange = (e) => setDescription(e.target.value);

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const method = selectedNote ? "PUT" : "POST";
			const type = selectedNote ? "EDIT NOTE" : "CREATE NOTE";
			let url = `${process.env.NEXT_PUBLIC_API_URL}/notes/`;
			if (method === "PUT") {
				url += selectedNote.id;
			}
			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title,
					description,
				}),
			});

			const data = await response.json();
			if ("message" in data) throw new Error(data.message);
			dispatch({
				type,
				payload: data,
			});
		} catch (e) {
			console.error(e);
			dispatch({
				type: "ERROR",
				payload: e.message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isOpen={isNoteModalOpen}
			onClose={() => dispatch({ type: "CLOSE MODAL" })}
			isCentered
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{selectedNote ? "Edit " : "Create "} Note</ModalHeader>
				<ModalCloseButton backgroundColor="transparent" border="none" />
				<ModalBody>
					<Box mb="10px">
						<Input
							placeholder="Title"
							value={title}
							variant="outline"
							onChange={handleTitleChange}
						/>
					</Box>
					<Box>
						<Textarea
							placeholder="Description"
							value={description}
							onChange={handleDescriptionChange}
						/>
					</Box>
				</ModalBody>
				<ModalFooter>
					<Button
						backgroundColor="black"
						border="black"
						variant="solid"
						color="white"
						isLoading={isLoading}
						onClick={handleSubmit}
					>
						{selectedNote ? "Edit " : "Create "} Note
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
