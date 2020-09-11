import { Box, Flex, Spinner } from "@chakra-ui/core";
import { FunctionComponent } from "react";

import User from "./User";
import { useFetcher } from "../../hooks";

interface UserProps {
	users?: NoteUser[];
}

const Users: FunctionComponent<UserProps> = () => {
	const { data: users, error } = useFetcher("/users");
	if (error) {
		return <div>Could note fetch users</div>;
	}
	if (!users) {
		return (
			<Flex justifyContent="center" alignItems="center" mt="2" mb="2">
				<Spinner />
			</Flex>
		);
	}

	return (
		<Box width="100%">
			{users.map((user) => (
				<User key={user.username} user={user} />
			))}
		</Box>
	);
};

export default Users;
