import React, { Dispatch } from "react";
import reducer from "../../reducer";
import { PageProviderProps as Props, InitialState } from "../../types";

export const PageContext = React.createContext<{
	state: InitialState;
	dispatch: Dispatch<any>;
}>({
	state: {},
	dispatch: () => {},
});

export const PageProvider: React.FC<Props> = ({
	children,
	initialState,
}: Props) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	return (
		<PageContext.Provider value={{ state, dispatch }}>
			{children}
		</PageContext.Provider>
	);
};

export const usePageProvider = () => React.useContext(PageContext);
