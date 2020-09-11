import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import UserLayout from "../components/Layout/UserLayout";
import { NoteList } from "../components/NoteList";
import { storeContext } from "../store";
import {
	NOTE_EDIT_VIEW,
	NOTE_SINGLE_VIEW,
	NOTE_CREATE_VIEW,
} from "../store/constants";
import NoteForm from "../components/NoteForm";
import NoteView from "../components/NoteView";
import { getUserfromCookie } from "../libs/cookie";

const UserNotesPage = () => {
	const { state, handleLogout } = useContext(storeContext);
	const router = useRouter();
	const username = router.query.username;

	useEffect(() => {
		const user = getUserfromCookie();
		if (!user) {
			handleLogout();
			router.push("/");
		}
	}, [router, handleLogout]);

	const renderView = () => {
		switch (state?.noteViewName) {
			case NOTE_EDIT_VIEW:
				return <NoteForm editNote={state.note} isEditing={true} />;
			case NOTE_SINGLE_VIEW:
				return <NoteView note={state.note} />;
			case NOTE_CREATE_VIEW:
				return <NoteForm />;
			default:
				return <NoteList notesURI={`/users/${username}/notes`} />;
		}
	};

	return <UserLayout>{renderView()}</UserLayout>;
};

export default UserNotesPage;
