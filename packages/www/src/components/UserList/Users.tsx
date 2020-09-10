import { Box, Flex, Text, Spinner } from "@chakra-ui/core";

import User from "./User";
import { useFetcher } from "../../hooks";

interface UserDetail {
	id?: number;
	username: string;
	password: string;
	notes?: INote[];
	is_admin?: boolean;
}

interface UserProps {
	users?: UserDetail[];
}

const Users = ({}: UserProps) => {
	const { data: users, error } = useFetcher("/users");
	if (error) {
		return <div>error</div>;
	}
	if (!users) {
		return <Spinner />;
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
