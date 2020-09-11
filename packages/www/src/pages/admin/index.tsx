import { useContext, useEffect } from "react";
import { Flex, Box, Text, IconButton } from "@chakra-ui/core";

import AdminLayout from "../../components/Layout/AdminLayout";
import { UserList } from "../../components/UserList";
import { NoteList } from "../../components/NoteList";
import NoteForm from "../../components/NoteForm";
import NoteView from "../../components/NoteView";
import {
	storeContext,
	setUserView,
	NOTE_EDIT_VIEW,
	NOTE_SINGLE_VIEW,
	NOTE_CREATE_VIEW,
	USER_CREATE_VIEW,
} from "../../store";
import NewUserForm from "../../components/NewUserForm";
import { getUserfromCookie } from "../../libs/cookie";
import { useRouter } from "next/router";

const AdminHome = () => {
	const { state, dispatch } = useContext(storeContext);
	const router = useRouter();

	useEffect(() => {
		const user = getUserfromCookie();
		if (!user || !user?.is_admin) {
			router.push("/admin/login");
		}
	}, [router]);

	const renderNoteViews = () => {
		switch (state?.noteViewName) {
			case NOTE_EDIT_VIEW:
				return <NoteForm editNote={state.note} isEditing={true} />;
			case NOTE_SINGLE_VIEW:
				return <NoteView note={state.note} />;
			case NOTE_CREATE_VIEW:
				return <NoteForm />;
			default:
				return state.editedUser?.username ? (
					<Box>
						<Text
							color="grey"
							fontSize="2xl"
							mt="1"
							mb="1"
							textTransform="capitalize"
							textAlign="center"
						>
							{state.editedUser.username} Notes
						</Text>
						<NoteList
							notesURI={
								state.editedUser?.username
									? `/users/${state.editedUser.username}/notes`
									: null
							}
						/>
					</Box>
				) : (
					<NoteList notesURI={null} />
				);
		}
	};

	const renderUserViews = () => {
		switch (state?.userViewName) {
			case USER_CREATE_VIEW:
				return <NewUserForm />;
			default:
				return <UserList />;
		}
	};

	const userPanelHeader = (
		<Flex justifyContent="space-between" alignItems="center">
			<Text m="1" color="grey" fontSize="xl">
				Note Users
			</Text>
			<IconButton
				icon="add"
				size="sm"
				aria-label="add note"
				border="0"
				bg="#fc5c9c"
				variantColor="#fc5c9c"
				mr="1"
				mt="1"
				color="#fff"
				onClick={() => dispatch(setUserView(USER_CREATE_VIEW))}
			/>
		</Flex>
	);

	return (
		<AdminLayout>
			<Flex width="100%">
				<Box width="30%" bg="#f5f5f5" mr="2" rounded="5px">
					{userPanelHeader}
					{renderUserViews()}
				</Box>
				<Box width="70%">{renderNoteViews()}</Box>
			</Flex>
		</AdminLayout>
	);
};

export default AdminHome;
