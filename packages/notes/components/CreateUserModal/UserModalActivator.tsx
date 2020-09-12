import React from "react";
import { usePageProvider } from "../PageProvider";
import CreateBtn from "../NoteModal/CreateBtn";

export default () => {
	const { dispatch } = usePageProvider();

	const handleClick = () => {
		dispatch({
			type: "OPEN USER MODAL",
		});
	};

	return <CreateBtn handleClick={handleClick} />;
};
