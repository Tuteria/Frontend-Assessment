import UserDisplay from "./display";

const UserList = ({ users }: UserListProps) => (
	<div>
		{users.map((user, i) => (
			<UserDisplay key={`user-display-${i}`} user={user} />
		))}
	</div>
);

interface User {
	id?: number;
	name?: string;
	username?: string;
}

interface UserListProps {
	users?: User[];
}

export default UserList;
