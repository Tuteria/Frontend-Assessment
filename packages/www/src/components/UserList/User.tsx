import { Box, Text } from "@chakra-ui/core";
import { useContext } from "react";
import { storeContext, setEditedUser } from "../../store";

const User = ({ user }) => {
	const { dispatch } = useContext(storeContext);

	const handleClick = () => {
		dispatch(setEditedUser(user));
	};
	return (
		<Text
			pl="1"
			pr="2"
			cursor="pointer"
			color="#fc5c9c"
			fontSize="1xl"
			textTransform="capitalize"
			onClick={handleClick}
		>
			{user.username}
		</Text>
	);
};

export default User;
