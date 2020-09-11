import { useReducer } from "react";
import {
	SET_NOTE_VIEW,
	SET_USER_VIEW,
	SET_ACTIVE_NOTE,
	SET_ACTIVE_USER,
	USER_LOGOUT,
	EDITED_USER,
} from "./constants";

const createAction = (actionType: string) => (payload: any) => ({
	type: actionType,
	payload,
});

export const setNoteView = createAction(SET_NOTE_VIEW);
export const setUserView = createAction(SET_USER_VIEW);
export const setActiveNote = createAction(SET_ACTIVE_NOTE);
export const setActiveUser = createAction(SET_ACTIVE_USER);
export const logout = createAction(USER_LOGOUT);
export const setEditedUser = createAction(EDITED_USER);

const reducer = (state: any, action: any) => {
	switch (action.type) {
		case SET_ACTIVE_NOTE:
			return { ...state, note: action.payload };
		case SET_NOTE_VIEW:
			return { ...state, noteViewName: action.payload };
		case SET_USER_VIEW:
			return { ...state, userViewName: action.payload };
		case SET_ACTIVE_USER:
			return { ...state, currentUser: action.payload, isAuthenticated: true };
		case USER_LOGOUT:
			return { ...state, currentUser: {}, isAuthenticated: false };
		case EDITED_USER:
			return { ...state, editedUser: action.payload };
		default:
			return state;
	}
};

const initialState = {
	note: {},
	noteViewName: "",
	userViewName: "",
	currentUser: {},
	isAuthenticated: false,
	editedUser: {},
};

export const useStoreReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return [state, dispatch];
};
