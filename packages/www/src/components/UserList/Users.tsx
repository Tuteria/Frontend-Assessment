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
