import UserDisplay from "./display";

const UserList = ({ users, viewUserNotes }: UserListProps) => (
	<div>
		{users.map((user, i) => (
			<UserDisplay key={`user-display-${i}`} user={user} viewUserNotes={viewUserNotes} />
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
	viewUserNotes(username: string): void
}

export default UserList;
