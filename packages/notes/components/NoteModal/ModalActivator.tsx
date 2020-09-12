import React from "react";
import { useRouter } from "next/router";
import { usePageProvider } from "../PageProvider";
import CreateBtn from "./CreateBtn";
import EditBtn from "./EditBtn";
import { NoteProps } from "../../types";

type Props = NoteProps | null;

const ModalActivator: React.FC<Props> = ({ note }: Props) => {
	const {
		dispatch,
		state: { user },
	} = usePageProvider();
	const router = useRouter();
	const { username } = router.query;
	const isIndexPage = !username;
	const isLoggedInUsersPage = user && user.username === username;
	const handleClick = () => {
		dispatch({
			type: "OPEN MODAL",
			payload: note,
		});
	};
	if (isIndexPage || isLoggedInUsersPage) {
		if (note) return <EditBtn handleClick={handleClick} />;
		return <CreateBtn handleClick={handleClick} />;
	}
	return null;
};

export default ModalActivator;
