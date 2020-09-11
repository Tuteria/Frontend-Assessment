import React, { createContext, useEffect, Dispatch, ReducerState } from "react";
import { useStoreReducer, setActiveUser, logout } from "./reducer";
import { getUserfromCookie, removeAuthToken } from "../libs/cookie";

interface IStoreContext {
	state?: any;
	dispatch?: any;
	handleLogout?: any;
	handleLogin?: any;
}

const defaultValues: IStoreContext = {};
export const storeContext = createContext(defaultValues);

const Provider = ({ children }) => {
	const [state, dispatch] = useStoreReducer();
	useEffect(() => {
		const user = getUserfromCookie();
		if (!user) {
			dispatch(logout(null));
			return () => {};
		}
		dispatch(setActiveUser(user));
	}, [dispatch]);

	const handleLogout = () => {
		removeAuthToken();
		dispatch(logout(null));
	};

	const handleLogin = (user: NoteUser) => {
		dispatch(setActiveUser(user));
	};

	return (
		<storeContext.Provider
			value={{ state, dispatch, handleLogout, handleLogin }}
		>
			{children}
		</storeContext.Provider>
	);
};

export default Provider;
