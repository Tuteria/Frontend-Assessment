import {
	Box,
	Text,
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuDivider,
	MenuItem,
	Icon,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useContext } from "react";

import { storeContext, setNoteView } from "../store";
import { NOTE_CREATE_VIEW, NOTE_LIST_VIEW } from "../store/constants";

const Header = () => {
	const { state, handleLogout } = useContext(storeContext);
	const router = useRouter();
	const { dispatch } = useContext(storeContext);
	const username = router.query?.username;

	const userLogout = (e) => {
		e.preventDefault();
		handleLogout();
		router.push("/");
	};

	const gotoLogin = (e) => {
		e.preventDefault();
		router.push("/login");
	};

	const gotoMyNotes = (e) => {
		e.preventDefault();
		const username = state.currentUser.username;
		router.push("/[username]", `/${username}`, { shallow: true });
	};

	return (
		<Box width="100%" mt={[2, 5, 10]}>
			<Flex justifyContent="space-between" alignItems="center">
				<Text
					mt="2"
					mb="3"
					fontSize="2rem"
					cursor="pointer"
					textTransform="capitalize"
					onClick={() => dispatch(setNoteView(NOTE_LIST_VIEW))}
				>
					{state.currentUser?.username &&
						username &&
						state.currentUser.username}{" "}
					Notes
				</Text>
				<Flex>
					<IconButton
						icon="add"
						size="lg"
						aria-label="add note"
						border="0"
						bg="#fc5c9c"
						variantColor="#fc5c9c"
						color="#fff"
						onClick={() => dispatch(setNoteView(NOTE_CREATE_VIEW))}
					/>
					<Menu>
						<MenuButton
							ml="2"
							px={4}
							py={2}
							transition="all 0.2s"
							rounded="md"
							borderWidth="1px"
							_hover={{ bg: "gray.100" }}
							_expanded={{ bg: "red.200" }}
							_focus={{ outline: 0, boxShadow: "outline" }}
						>
							<Icon name="drag-handle" />
						</MenuButton>
						<MenuList>
							{state.isAuthenticated ? (
								<React.Fragment>
									<MenuItem border="0" onClick={gotoMyNotes}>
										My Notes
									</MenuItem>
									<MenuItem border="0" mt="1" onClick={userLogout}>
										Logout
									</MenuItem>
								</React.Fragment>
							) : (
								<MenuItem border="0" onClick={gotoLogin}>
									Login
								</MenuItem>
							)}
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
