import { InitialState } from "./types";

const reducer = (state: InitialState, { type, payload }) => {
	switch (type) {
		case "OPEN MODAL":
			return {
				...state,
				isNoteModalOpen: true,
				selectedNote: payload,
			};
		case "OPEN USER MODAL":
			return {
				...state,
				isUserModalOpen: true,
			};
		case "CLOSE MODAL":
			return {
				...state,
				isNoteModalOpen: false,
				isUserModalOpen: false,
			};
		case "CREATE NOTE":
			return {
				...state,
				isNoteModalOpen: false,
				notes: [payload, ...state.notes],
			};
		case "EDIT NOTE":
			return {
				...state,
				notes: [payload, ...state.notes.filter(({ id }) => id !== payload.id)],
				isNoteModalOpen: false,
			};
		case "DELETE NOTE":
			return {
				...state,
				notes: state.notes.filter(({ id }) => id !== payload.id),
			};
		case "ADD USER":
			return {
				...state,
				users: [...state.users, payload],
				isUserModalOpen: false,
			};
		default:
			return state;
	}
};

export default reducer;
