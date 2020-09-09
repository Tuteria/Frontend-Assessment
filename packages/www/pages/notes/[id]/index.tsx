import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import url from "../../../src/appEnv";
import {
	Stack,
	Text,
	Box,
	Button,
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	PopoverFooter,
	ButtonGroup,
	Spinner,
	useToast,
} from "@chakra-ui/core";

const Note = ({ note }) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const open = () => setIsOpen(!isOpen);
	const close = () => setIsOpen(false);
	const router = useRouter();
	const toast = useToast();

	useEffect(() => {
		if (isDeleting) {
			deleteNote();
		}
	}, [isDeleting]);

	const handleDelete = async () => {
		setIsDeleting(true);
		close();
	};

	const deleteNote = async () => {
		const noteId = router.query.id;
		try {
			const deleted = await fetch(`${url.BASE_URL}/notes/${noteId}`, {
				method: "Delete",
			});

			router.push("/");
			toast({
				title: "Note Deleted.",
				description: "Note Deleted successfully",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Stack maxWidth={600} margin="auto" spacing={5} marginTop={5}>
			{isDeleting ? (
				<Spinner
					mx="auto"
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			) : (
				<>
					{" "}
					<Box
						maxW="xl"
						borderWidth="1px"
						rounded="lg"
						overflow="hidden"
						display="flex"
						alignItems="center"
						marginBottom={3}
					>
						<Text mx="auto" fontSize={32}>
							{note.title}
						</Text>
					</Box>
					<Box
						maxW="xl"
						borderWidth="1px"
						rounded="lg"
						overflow="hidden"
						display="flex"
						alignItems="center"
					>
						<Stack margin="auto" spacing={3} marginTop={5} marginBottom={3}>
							<Box fontWeight="semibold" as="h4" lineHeight="tight" p="6">
								{note.body}
							</Box>
							<Button size="sm" variantColor="red" onClick={open}>
								Delete
							</Button>
						</Stack>
					</Box>
				</>
			)}

			<Popover
				returnFocusOnClose={false}
				isOpen={isOpen}
				onClose={close}
				placement="right"
				closeOnBlur={false}
			>
				<PopoverContent zIndex={4}>
					<PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverBody>Are you sure you want to delete?</PopoverBody>
					<PopoverFooter d="flex" justifyContent="flex-end">
						<ButtonGroup size="sm">
							<Button variant="outline" onClick={close}>
								Cancel
							</Button>
							<Button variantColor="red" onClick={handleDelete}>
								Delete
							</Button>
						</ButtonGroup>
					</PopoverFooter>
				</PopoverContent>
			</Popover>
		</Stack>
	);
};

Note.getInitialProps = async (ctx) => {
	const note = await fetch(`${url.BASE_URL}/notes/${ctx.query.id}`);
	const data = await note.json();
	return { note: data };
};

export default Note;
