import { useContext } from "react";

import UserLayout from "../components/Layout/UserLayout";
import { NoteList } from "../components/NoteList";
import { storeContext } from "../store";
import { NOTE_EDIT_VIEW, NOTE_SINGLE_VIEW, NOTE_CREATE_VIEW } from "../store";
import NoteForm from "../components/NoteForm";
import NoteView from "../components/NoteView";

const Home = () => {
	const { state } = useContext(storeContext);

	const renderView = () => {
		switch (state?.noteViewName) {
			case NOTE_EDIT_VIEW:
				return <NoteForm editNote={state.note} isEditing={true} />;
			case NOTE_SINGLE_VIEW:
				return <NoteView note={state.note} />;
			case NOTE_CREATE_VIEW:
				return <NoteForm />;
			default:
				return <NoteList />;
		}
	};

	return <UserLayout>{renderView()}</UserLayout>;
};

export default Home;
