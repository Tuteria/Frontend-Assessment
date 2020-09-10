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
	Link,
	Badge,
} from "@chakra-ui/core";

const UserNotes = ({ notes }) => {
	return (
		<div className="space-between">
			<div className="grid">
				{notes.map((note) => {
					return (
						<Box maxW="md" borderWidth="1px" rounded="lg" overflow="hidden">
							<Box p="6">
								<Box d="flex" alignItems="center">
									<Box
										color="gray.500"
										fontWeight="semibold"
										letterSpacing="wide"
										fontSize="xl"
										textTransform="uppercase"
										ml="2"
									>
										<Link href={`/notes/${note.id}`}>
											<a> {note.title} </a>
										</Link>
									</Box>
								</Box>

								<Box
									mt="1"
									fontWeight="semibold"
									as="h4"
									lineHeight="tight"
									isTruncated
								>
									{note.body}
								</Box>

								<Box>
									<Badge rounded="full" px="2" variantColor="teal">
										{note.category}
									</Badge>

									<Box as="span" color="gray.600" fontSize="sm"></Box>
								</Box>
								<br />
								<Box>
									<ButtonGroup spacing={4}>
										<Link href={`/notes/${note.id}`}>
											<Button variantColor="teal" variant="solid" size="sm">
												View
											</Button>
										</Link>
										<span className="space-out"></span>
										<Link href={`/notes/${note.id}/edit`}>
											<Button variantColor="teal" variant="outline" size="sm">
												Edit
											</Button>
										</Link>
										<span className="space-out"></span>
									</ButtonGroup>
								</Box>
							</Box>
						</Box>
					);
				})}
			</div>
		</div>
	);
};

UserNotes.getInitialProps = async (ctx) => {
	const notes = await fetch(
		`${url.BASE_URL}/users/${ctx.query.username}/notes`
	);
	const data = await notes.json();

	return { notes: data };
};

export default UserNotes;
