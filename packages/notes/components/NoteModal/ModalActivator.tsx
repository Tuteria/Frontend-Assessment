import React from "react";
import { usePageProvider } from "../PageProvider";
import CreateBtn from "./CreateBtn";
import EditBtn from "./EditBtn";
import { NoteProps } from "../../types";

type Props = NoteProps | null;

const ModalActivator: React.FC<Props> = ({ note }: Props) => {
	const { dispatch } = usePageProvider();
	const handleClick = () => {
		dispatch({
			type: "OPEN MODAL",
			payload: note,
		});
	};
	if (note) return <EditBtn handleClick={handleClick} />;
	return <CreateBtn handleClick={handleClick} />;
};

export default ModalActivator;
