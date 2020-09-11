import {
	Box,
	Text,
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Icon,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useContext } from "react";

import { storeContext, setNoteView, setUserView } from "../store";
import {
	NOTE_CREATE_VIEW,
	NOTE_LIST_VIEW,
	USER_LIST_VIEW,
} from "../store/constants";

const AdminHeader = () => {
	const { handleLogout } = useContext(storeContext);
	const router = useRouter();
	const { dispatch } = useContext(storeContext);

	const adminLogout = (e) => {
		e.preventDefault();
		handleLogout();
		router.push("/");
	};

	const gotoAdminHome = (e) => {
		dispatch(setNoteView(NOTE_LIST_VIEW));
		dispatch(setUserView(USER_LIST_VIEW));
	};

	return (
		<Box width="100%" mt={[2, 5, 10]}>
			<Flex justifyContent="space-between" alignItems="center">
				<Text
					mt="2"
					mb="3"
					fontSize="2rem"
					cursor="pointer"
					onClick={gotoAdminHome}
				>
					Notes Admin
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
							<MenuItem border="0" onClick={adminLogout}>
								Logout
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
		</Box>
	);
};

export default AdminHeader;
