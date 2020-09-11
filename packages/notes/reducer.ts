import { InitialState } from "./types";

const reducer = (state: InitialState, { type, payload }) => {
	switch (type) {
		case "OPEN MODAL":
			return {
				...state,
				isNoteModalOpen: true,
				selectedNote: payload,
			};
		case "CLOSE MODAL":
			return {
				...state,
				isNoteModalOpen: false,
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
		default:
			return state;
	}
};

export default reducer;
